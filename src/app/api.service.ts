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
  user_key: string = 'd0fb97d526bdb53aff6805eb806f795f'; // 420f6b4e0db93ed2d24248bba461132d a2a89757830b0a81529d99471b62201a
  // 823ce2ad9697f981568837ab540b9b5b 50d97a766c459f52dcfba937c7fc7137

  gameList: Game[] = [];
  dateList: Game[] = [];
  currentDate: number = Math.trunc(Date.now() / 1000);

  constructor (private httpClient: HttpClient){ }

  //connect to API server

  getPopularGames() : Observable<Game[]> {
    console.log('Getting popular games');

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=5&order=popularity:desc',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
  }

  getComingGames() : Observable<Game[]> {
    console.log('Getting coming games');

    return this.httpClient.get<Game[]>(this.apiURL + '/release_dates/?fields=*&limit=5&order=date:asc&filter[date][gt]=' + this.currentDate + '&expand=game',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
  }

  getRecentGames() : Observable<Game[]> {
    console.log('Getting recent games');

    return this.httpClient.get<Game[]>(this.apiURL + '/release_dates/?fields=*&limit=5&order=date:desc&filter[date][lt]=' + this.currentDate + '&expand=game',
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
  }

  //master search method

  searchGamesList(searchEntry: string) {
    let gameID: Game[] = [];

    this.searchGameByID(searchEntry).subscribe(async data => {
      gameID = data;

      if (gameID.length > 1) {
        for (let i = 0; i < gameID.length; i++) {
          await this.getGameInfo('games', gameID[i].id).toPromise().then(game => {
            this.getGameInfo('release_dates', gameID[i].id).toPromise().then(data => {
              this.gameList.push(game[0]);
              this.dateList.push(data[0]);

              if (this.dateList[i]) {
                this.gameList[i].y = this.dateList[i].y;
              }
            });
          })
        }
      }
    })

    return of(this.gameList);
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

  getGameInfo(endpoint: string, gameID: number) {
    console.log('Getting game data by search ID');

    return this.httpClient.get(this.apiURL + '/' + endpoint + '/' + gameID + '?fields=*',
      {headers: {
        "Accept":"application/json",
        "user-key":this.user_key,
        "X-Requested-With":"origin"
    }})
  }
}
