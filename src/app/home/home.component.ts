import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularGames: Game[] = [];
  comingGames: Game[] = [];
  recentGames: Game[] = [];
  anticipatedGames: Game[] = [];

  showSpinner: boolean = true;
  currentDate: number = Math.trunc(Date.now() / 1000);

  constructor(private apiService: ApiService) { }

  async ngOnInit(){
    this.popularGames = await this.getGameOfGames('games', '&limit=5&order=popularity:desc');
    this.anticipatedGames = await this.getGameOfGames('games', '&limit=5&order=date:asc&filter[first_release_date][gt]=' + this.currentDate + '&filter[rating][gt]=60');

    this.getGameOfDates(this.comingGames, 'release_dates', '&limit=5&order=date:asc&filter[date][gt]=' + this.currentDate);
    this.getGameOfDates(this.recentGames, 'release_dates', '&limit=5&order=date:desc&filter[date][lt]=' + this.currentDate);

    console.log(this.popularGames);
    console.log(this.comingGames);
  }

  //get game data from API

  async getGameOfGames(endpoint: string, gamesType: string) {
    let gameOfGames: Game[] = [];
    let gameOfDates: Game[] = [];
    let gameOfPlatforms: Game[] = [];

    await this.apiService.getGamesData(endpoint, gamesType).toPromise().then(async game_data => {
      console.log(game_data, "Request game of games");
      gameOfGames = game_data;

      for (let i = 0; i < gameOfGames.length; i++) {
        if (gameOfGames[i].release_dates) {
          await this.apiService.getGamesData('release_dates/' + gameOfGames[i].release_dates[0], '').toPromise().then(data => {
            gameOfDates.push(data[0]);

            if (gameOfDates[i]) {
              gameOfGames[i].y = gameOfDates[i].y;
              gameOfGames[i].human = gameOfDates[i].human;
            }
          });
        }

        if (gameOfGames[i].platforms) {
          await this.apiService.getGamesData('platforms/' + gameOfGames[i].platforms[0], '').toPromise().then(data => {
            gameOfPlatforms.push(data[0]);

            if (gameOfPlatforms[i]) {
              gameOfGames[i].abbreviation = gameOfPlatforms[i].abbreviation;
            }
          });
        }
      }
    });

    return gameOfGames;
  }

  getGameOfDates(dateOfGames: Game[], endpoint: string, gamesType: string) {
     let dateOfDates: Game[] = [];
     let dateOfPlatforms: Game[] = [];

    this.apiService.getGamesData(endpoint, gamesType).subscribe(async game_data => {
      console.log(game_data, "Request date of games");
      dateOfDates = game_data;

      for (let i = 0; i < dateOfDates.length; i++) {
        await this.apiService.getGamesData('games/' + dateOfDates[i].game, '').toPromise().then(data => {
          dateOfGames.push(data[0]);

          if (dateOfDates[i]) {
            dateOfGames[i].human = dateOfDates[i].human;
          }
        });

        if (dateOfGames[i].platforms) {
          await this.apiService.getGamesData('platforms/' + dateOfGames[i].platforms[0], '').toPromise().then(data => {
            dateOfPlatforms.push(data[0]);

            if (dateOfPlatforms[i]) {
              dateOfGames[i].abbreviation = dateOfPlatforms[i].abbreviation;
            }
          });
        }
      }

      this.showSpinner = false;
    });
  }
}
