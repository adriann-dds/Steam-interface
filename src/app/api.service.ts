import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from './game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = '/api';
  user_key: string = '420f6b4e0db93ed2d24248bba461132d';
  data: any = {}

  constructor(private httpClient: HttpClient){
    this.getGame()
  }

  getGame(): Observable<any> {
    let headers = new HttpHeaders().set('TRN-Api-Key', this.user_key);

    return this.httpClient.get(this.apiURL + '/platforms', { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    } });
  }

}
