import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';
import { FormControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input('GamesInput') games: Game;
  @Input('DatesInput') dates: Game;
  shared: Game;

  showSpinner: boolean = true;

  constructor(private apiService: ApiService) {
    // this.getGame()
  }

  ngOnInit(){
    this.getGame()
  }

  //get game data from API

  getGame() {
    this.apiService.requestMultipleApi().subscribe(game_data => {
      console.log(game_data);
      this.games = game_data[0];
      this.dates = game_data[1];
      this.shared = this.games;
      this.showSpinner = false;
    });
  }

  //get games to favorites component

  getGames() {
    // this.getGame();
    console.log(this.shared, "GameComponent");
    return this.shared;
  }
}
