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
  user_key: string = '50d97a766c459f52dcfba937c7fc7137'; // 420f6b4e0db93ed2d24248bba461132d a2a89757830b0a81529d99471b62201a
                                                        // 823ce2ad9697f981568837ab540b9b5b
  constructor(
    private httpClient: HttpClient
  ){ }

  //connect to multiple API

  public requestMultipleApi(): Observable<Game[]> {
    console.log('Getting games');

    let headers1 = this.httpClient.get(this.apiURL + '/games/?fields=*&limit=10&order=popularity:desc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    let headers2 = this.httpClient.get(this.apiURL + '/release_dates/?fields=*&limit=10&order=popularity:desc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    let headers3 = this.httpClient.get(this.apiURL + '/screenshots/?fields=*&limit=10&order=popularity:desc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    return forkJoin([headers1, headers2, headers3]);
  }

  //connect to API server

  // public getGame() : Observable<Game[]> {
  //   console.log('Getting games');
  //   let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);
  //
  //   return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=10&order=popularity:desc',
  //   { headers: {
  //     "Accept":"application/json",
  //     "user-key":this.user_key
  //   }});
  // }

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
    console.log('Getting games by search entry');

    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    // let headers1 = this.httpClient.get(this.apiURL + '/games/?search=' + searchEntry + '?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // let headers2 = this.httpClient.get(this.apiURL + '/release_dates/?search=' + searchEntry + '?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // let headers3 = this.httpClient.get(this.apiURL + '/screenshots/?search=' + searchEntry + '?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // return forkJoin([headers1, headers2, headers3]);

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?search=' + searchEntry + '?fields=*&limit=10',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        'content-type': 'application/x-www-form-urlencoded'
    }})
  }

  //get all info about a game

  getGameInfo(gameID: number) {
    console.log('Getting games by search ID');

    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    // let headers1 = this.httpClient.get(this.apiURL + '/games/'+ gameID +'?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // let headers2 = this.httpClient.get(this.apiURL + '/release_dates/'+ gameID +'?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // let headers3 = this.httpClient.get(this.apiURL + '/screenshots/'+ gameID +'?fields=*&limit=10',
    // { headers: {
    //   "Accept":"application/json",
    //   "user-key":this.user_key
    // }});
    //
    // return forkJoin([headers1, headers2, headers3]);

    return this.httpClient.get(this.apiURL + '/games/'+ gameID +'?fields=*&limit=10',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        'content-type': 'application/x-www-form-urlencoded'
    }})
  }
}
