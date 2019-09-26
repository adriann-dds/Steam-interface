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
  popularDates: Game[] = [];
  popularPlatforms: Game[] = [];

  comingGames: Game[] = [];
  comingDates: Game[] = [];
  comingPlatforms: Game[] = [];

  recentGames: Game[] = [];
  recentDates: Game[] = [];
  recentPlatforms: Game[] = [];

  anticipatedGames: Game[] = [];
  anticipatedDates: Game[] = [];
  anticipatedPlatforms: Game[] = [];

  showSpinner: boolean = true;
  currentDate: number = Math.trunc(Date.now() / 1000);

  constructor(private apiService: ApiService) { }

  async ngOnInit(){
    // await this.getAnticipatedGame(); this works, the other one doesn't
    // await this.getPopularGame(); this works, the other one doesn't

    await this.getGameOfGames(this.popularGames, this.popularDates, this.popularPlatforms,  'games', '&limit=5&order=popularity:desc');
    await this.getGameOfGames(this.anticipatedGames, this.anticipatedDates, this.anticipatedPlatforms,  'games', '&limit=5&order=date:asc&filter[first_release_date][gt]=' + this.currentDate + '&filter[rating][gt]=60');
    await this.getGameOfDates(this.comingGames, this.comingDates, this.comingPlatforms,  'release_dates', '&limit=5&order=date:asc&filter[date][gt]=' + this.currentDate);
    await this.getGameOfDates(this.recentGames, this.recentDates, this.recentPlatforms,  'release_dates', '&limit=5&order=date:desc&filter[date][lt]=' + this.currentDate);

    console.log(this.popularGames);
    console.log(this.comingGames);
  }

  //get game data from API

  async getGameOfGames(gameOfGames: Game[], gameOfDates: Game[], gameOfPlatforms: Game[], endpoint: string, gamesType: string) {
    await this.apiService.getGamesData(endpoint, gamesType).subscribe(async game_data => {
      console.log(game_data, "Request game of games");
      gameOfGames = game_data;

      for (let i = 0; i < gameOfGames.length; i++) {
        if (gameOfGames[i].release_dates) {
          await this.apiService.getGamesData('release_dates/' + gameOfGames[i].release_dates[0], '').toPromise().then(data => {
            gameOfDates.push(data[0]);

            if (gameOfDates[i]) {
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
  }

  getGameOfDates(dateOfGames: Game[], dateOfDates: Game[], dateOfPlatforms: Game[], endpoint: string, gamesType: string) {
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

  getPopularGame() {
    this.apiService.getGamesData('games', '&limit=5&order=popularity:desc').subscribe(async game_data => {
      console.log(game_data, "Request popular");
      this.popularGames = game_data;


      for (let i = 0; i < this.popularGames.length; i++) {
        if (this.popularGames[i].release_dates) {
          await this.apiService.getGamesData('release_dates/' + this.popularGames[i].release_dates[0], '').toPromise().then(data => {
            this.popularDates.push(data[0]);

            if (this.popularDates[i]) {
              this.popularGames[i].y = this.popularDates[i].y;
            }
          });
        }

        if (this.popularGames[i].platforms) {
          await this.apiService.getGamesData('platforms/' + this.popularGames[i].platforms[0], '').toPromise().then(data => {
            this.popularPlatforms.push(data[0]);

            if (this.popularPlatforms[i]) {
              this.popularGames[i].abbreviation = this.popularPlatforms[i].abbreviation;
            }
          });
        }
      }
    });
  }

  getAnticipatedGame() {
    this.apiService.getGamesData('games', '&limit=5&order=date:asc&filter[first_release_date][gt]=' + this.currentDate + '&filter[rating][gt]=60').subscribe(async game_data => {
      console.log(game_data, "Request anticipated");
      this.anticipatedGames = game_data;

      for (let i = 0; i < this.anticipatedGames.length; i++) {
        if (this.anticipatedGames[i].release_dates) {
          await this.apiService.getGamesData('release_dates/' + this.anticipatedGames[i].release_dates[0], '').toPromise().then(data => {
            this.anticipatedDates.push(data[0]);

            if (this.anticipatedDates[i]) {
              this.anticipatedGames[i].human = this.anticipatedDates[i].human;
            }
          });
        }

        if (this.anticipatedGames[i].platforms) {
          await this.apiService.getGamesData('platforms/' + this.anticipatedGames[i].platforms[0], '').toPromise().then(data => {
            this.anticipatedPlatforms.push(data[0]);

            if (this.anticipatedPlatforms[i]) {
              this.anticipatedGames[i].abbreviation = this.anticipatedPlatforms[i].abbreviation;
            }
          });
        }
      }
    });
  }
}
