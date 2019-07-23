import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Game, ICover, IReleaseDate } from './game';
import { Observable, of ,forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = '/api';
  user_key: string = 'a2a89757830b0a81529d99471b62201a'; // 420f6b4e0db93ed2d24248bba461132d
  //data: Game = {}
  //@Input('GamesInput') data: Game = {};

  constructor(
    private httpClient: HttpClient,
    //@Inject(MAT_DIALOG_DATA) public data: Game
  ){
    //this.getGame()
    //this.getGameCover()
  }

  //connect to API server

  getGame() : Observable<Game[]> {
    //let gameID: Game[] = [];

    console.log('Getting games');
    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=10&order=popularity:desc', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
/*
    const game = this.httpClient.get(this.apiURL + '/games/?fields=*&limit=10&order=popularity:desc', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    this.getGames().subscribe(data => {
      gameID = data;
    })

    const data = this.httpClient.get(this.apiURL + '/release_dates/'+ gameID +'?fields=*&limit=10&order=popularity:desc',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        "X-Requested-With":"origin"
    }})

    return forkJoin([game, data]);
    */
  }
  //  /games/?fields=*&limit=10&count?&filter[release_dates.date][gt]=688982179000&order=popularity:desc

  //get release date

  getDate(gameID: number) {
    console.log('Getting date');
    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    return this.httpClient.get<Game[]>(this.apiURL + '/release_dates/'+ gameID +'?fields=release_dates&limit=1', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }})

    //return gameID;
  }

  //master search method

  searchGames(searchEntry: string) {
    let gameID: Game[] = [];
    let gameList: Game[] = [];

    this.searchGameByID(searchEntry).subscribe(data => {
      gameID = data;

      if (gameID.length > 1) {
        gameID.forEach (async game => await this.getGameInfo(game.id).toPromise().then(data => gameList.push(data[0])))
      }
    })

    return of(gameList);
  }

  //search game by ID

  searchGameByID(searchEntry: string) : Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.apiURL + '/games/?search=' + searchEntry + '?fields=*&limit=10',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key
    }})
  }

  //get all info about a game

  getGameInfo(gameID: number) {
    return this.httpClient.get(this.apiURL + '/games/'+ gameID +'?fields=*',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        "X-Requested-With":"origin"
    }})
  }
}
