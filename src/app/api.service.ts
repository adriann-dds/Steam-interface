import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Game, ICover } from './game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = '/api';
  user_key: string = '420f6b4e0db93ed2d24248bba461132d';
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
    console.log('Getting games');
    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=10&count?&filter[release_dates.date][gt]=688982179000&order=popularity:desc', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
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

  //search game by // ID

  searchGameByID(searchEntry: string) {
    return this.httpClient.get<Game[]>(this.apiURL + '/games/?search='+ searchEntry + '?fields=*&limit=10',
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
