import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, forkJoin } from 'rxjs';
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
  @Input('GamesInput') games: Game[] = [];
  @Input('GamesInput') dates: Game[] = [];

  constructor(private apiService: ApiService) {
    this.getGame()
  }

  //get game data from API

  ngOnInit(){ }

  //get game data from API

  getGame() {
    this.apiService.getGame().subscribe(game_data => {
      console.log(game_data);
      this.games = game_data;
    });

    this.apiService.getDate(1234).subscribe(data => {
      console.log(data);
      this.dates = data;
    });

    /*
    forkJoin(this.apiService.getGame(), this.apiService.getDate()).subscribe(data => {
      console.log(data);
      this.games = data;
    });
    */
  }

  getGameInfo(gameID: number) {
    // this.apiService.getDate(gameID).subscribe(data => {
    //   console.log(data);
    //   this.dates = data;
    // });
  }

  /*
  getGame() {
    this.apiService.getGame().subscribe(game_data => {
      this.apiService.getDate().subscribe(data => {
        console.log(data);
        this.games = game_data;
        this.games = data;
      });
    });
  }
  */

  //get data from local imported files

  getGameCover(game : Game): string {
    return (game.cover.url);
  }

  getGameScreenshot(game : Game): string {
    return (game.screenshot.url);
  }
}
