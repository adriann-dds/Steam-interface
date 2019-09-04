import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Game } from './game';
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
  constructor (private httpClient: HttpClient){ }

  //connect to API server

  getGame() : Observable<Game[]> {
    console.log('Getting games -> singular API');

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=10&order=rating:asc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
  }

  //connect to multiple API

  requestMultipleApi(): Observable<Game[]> {
    console.log('Getting games -> multiple API');

    let headers1 = this.httpClient.get(this.apiURL + '/games/?fields=*&limit=10&order=rating:asc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    let headers2 = this.httpClient.get(this.apiURL + '/release_dates/?fields=*&limit=10&order=rating:asc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});

    return forkJoin([headers1, headers2]);
  }

  //master search method

  searchGamesList2(searchEntry: string) {
    let gameID: Game[] = [];
    let gameList: Game[] = [];
    let gameDates: Game[] = [];

    this.searchGameByID(searchEntry).subscribe(data => {
      gameID = data;

      if (gameID.length > 1) {
        gameID.forEach (async game => await this.getGameInfoGame(game.id).toPromise().then(data => {
          gameList.push(data[0]);

          // this.getGameInfoDate(data[0].id).toPromise().then(gameData => {
          //   gameList[0].y = gameData[0].y;
          // });
        }));

        gameID.forEach (async game => await this.getGameInfoDate(game.id).toPromise().then(data => {
          gameDates.push(data[0]);

        }));
      }

      // if (gameID.length > 1) {
      //   gameID.forEach (async game => await this.getGameInfoDate(game.id).toPromise().then(data => {
      //     gameDates.push(data[0]);
      //
      //   }));
      // }
    })

    // for (let i = 0; i < 10; i++) {
    //   // if(gameList[i] && gameDates[i].y) {
    //   console.log(gameDates[i].y);
    //     gameList[i].y = gameDates[i].y;
    //   // }
    // }

    console.log(gameDates);

    return of(gameList);
  }

  searchGamesList1(searchEntry: string) {
    let gameID: Game[] = [];
    let gameList: Game[] = [];
    let gameDates: Game[] = [];

    this.searchGameByID(searchEntry).subscribe(data => {
      gameID = data;

      if (gameID.length > 1) {
        gameID.forEach (async game => await this.getGameInfoDate(game.id).toPromise().then(data => {
          gameDates.push(data[0]);

        }));
      }

    })

    console.log(gameDates);

    return of(gameDates);
  }

  searchGamesDates(searchEntry: string) {
    let gameID: Game[] = [];
    let gameDates: Game[] = [];

    this.searchGameByID(searchEntry).subscribe(data => {
      gameID = data;
      console.log(gameID);
      if (gameID.length > 1) {
        gameID.forEach (async game => await this.getGameInfoDate(game.id).toPromise().then(data => gameDates.push(data[0])))
      }
    })

    return of(gameDates);
  }

  //search game by search entry

  searchGameByID(searchEntry: string) : Observable<Game[]> {
    console.log('Getting games by search entry');

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?search=' + searchEntry + '?fields=*&limit=10',
      {headers: {
        "Accept": "application/json",
        "user-key": this.user_key
    }})
  }

  //get all info about a game

  getGameInfoGame(gameID: number) {
    console.log('Getting games by search ID');

    return this.httpClient.get(this.apiURL + '/games/'+ gameID +'?fields=*',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        "X-Requested-With":"origin"
    }})
  }

  getGameInfoDate(gameID: number) {
    console.log('Getting dates by search ID');

    return this.httpClient.get(this.apiURL + '/release_dates/'+ gameID +'?fields=*',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        "X-Requested-With":"origin"
    }})
  }
}
