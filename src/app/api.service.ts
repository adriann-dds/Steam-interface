import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Game } from './game';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = '/api';
  user_key: string = 'a2a89757830b0a81529d99471b62201a';

  gameList: Game[] = [];
  dateList: Game[] = [];

  constructor (private httpClient: HttpClient){ }

  //connect to API server

  getGamesData(endpoint: string, gamesType: string) : Observable<Game[]> {

    return this.httpClient.get<Game[]>(this.apiURL + '/' + endpoint + '/?fields=*' + gamesType,
    { headers: {
      "Accept":"application/json",
      "user-key":this.user_key
    }});
  }

  async searchGamesList(searchEntry: string) {
    let gameID: Game[] = [];

    await this.getGamesData('games/?search=' + searchEntry, '&limit=10').toPromise().then(async data => {
      gameID = data;

      if (gameID.length > 1) {
        for (let i = 0; i < gameID.length; i++) {
          await this.getGamesData('games/' + gameID[i].id, '').toPromise().then(async game => {
            this.gameList.push(game[0]);

            if (this.gameList[i].release_dates) {
              await this.getGamesData('release_dates/' + this.gameList[i].release_dates[0], '').toPromise().then(async data => {
                this.dateList.push(data[0]);

                if (this.dateList[i]) {
                  this.gameList[i].y = this.dateList[i].y;
                }
              });
            } else {
              this.dateList.push(null);
            }

          })
        }
      }
    })

    return this.gameList;
  }
}
