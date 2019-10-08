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

  constructor() { }

  ngOnInit(){ }

}
