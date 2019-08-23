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

  showSpinner: boolean = true;

  constructor(private apiService: ApiService) {
    this.getGame()
  }

  ngOnInit(){ }

  //get game data from API

  getGame() {
    this.apiService.requestMultipleApi().subscribe(game_data => {
      console.log(game_data, "Request");
      this.games = game_data[0];
      this.dates = game_data[1];
      this.showSpinner = false;
    });
  }

  //favorite list functions

  findAll(): Game {
    return this.games;
  }

  find(id: number): Game {
    return this.games[this.getSelectedIndex(id)]
  }

  private getSelectedIndex(id: number) {
    console.log(this.games);
    for (var i = 0; i < 10; i++) {
      if (this.games[i].id == id) {
        return i;
      }
    }

    return -1;
  }
}
