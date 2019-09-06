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
  @Input('GamesInput') games: Game[] = [];

  dates: Game[] = [];
  showSpinner: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getGame()
  }

  //get game data from API

  getGame() {
    this.apiService.getGame().subscribe(async game_data => {
      console.log(game_data, "Request");
      this.games = game_data;
      this.showSpinner = false;


      for (let i = 0; i < this.games.length; i++) {
        await this.apiService.getGameInfoDate(this.games[i].id).toPromise().then(data => {
          this.dates.push(data[0]);

          if (this.dates[i]) {
            this.games[i].y = this.dates[i].y;
          }
        });
      }
    });
  }
}
