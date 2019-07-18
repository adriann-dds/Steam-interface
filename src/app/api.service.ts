import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Game, ICover } from './game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) public data: Game
  ){
    this.getGame()
    //this.getGameCover()
  }

  getGame(): Observable<any> {
    console.log('Getting games');
    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    return this.httpClient.get<Game[]>(this.apiURL + '/games/?fields=*&limit=10&count?&filter[release_dates.date][gt]=688982179000&order=popularity:desc', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    } });
  }

  getGameCover(): string {
    return ('http:' + this.data.cover.url);
  }
}
