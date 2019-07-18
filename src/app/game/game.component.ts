import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input('GamesInput') games: Game[];
  //games: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(){}

  getGame() {
    this.games = [];
    this.apiService.getGame().subscribe((data: any) => {
      console.log(data);
      this.games = data;
    });
  }

  getGameCover(game : Game): string {
    return ('http:' + game.cover.url);
  }
}
