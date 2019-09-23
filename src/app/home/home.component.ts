import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';
import { FormControl } from '@angular/forms';
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

  constructor(private apiService: ApiService) { }

  async ngOnInit(){
    await this.getPopularGame();
    await this.getComingGame();
    await this.getRecentGame();
    await this.getAnticipatedGame();
  }

  //get game data from API

  getPopularGame() {
    this.apiService.getPopularGames().subscribe(async game_data => {
      console.log(game_data, "Request popular");
      this.popularGames = game_data;


      for (let i = 0; i < this.popularGames.length; i++) {
        if (this.popularGames[i].release_dates) {
          await this.apiService.getGameInfo('release_dates', this.popularGames[i].release_dates[0]).toPromise().then(data => {
            this.popularDates.push(data[0]);

            if (this.popularDates[i]) {
              this.popularGames[i].y = this.popularDates[i].y;
            }
          });
        }

        if (this.popularGames[i].platforms) {
          await this.apiService.getGameInfo('platforms', this.popularGames[i].platforms[0]).toPromise().then(data => {
            this.popularPlatforms.push(data[0]);

            if (this.popularPlatforms[i]) {
              this.popularGames[i].abbreviation = this.popularPlatforms[i].abbreviation;
            }
          });
        }
      }
    });
  }

  getComingGame() {
    this.apiService.getComingGames().subscribe(async game_data => {
      console.log(game_data, "Request coming");
      this.comingDates = game_data;


      for (let i = 0; i < this.comingDates.length; i++) {
        await this.apiService.getGameInfo('games', this.comingDates[i].game).toPromise().then(data => {
          this.comingGames.push(data[0]);

          if (this.comingDates[i]) {
            this.comingGames[i].y = this.comingDates[i].y;
          }
        });

        if (this.comingGames[i].platforms) {
          await this.apiService.getGameInfo('platforms', this.comingGames[i].platforms[0]).toPromise().then(data => {
            this.comingPlatforms.push(data[0]);

            if (this.comingPlatforms[i]) {
              this.comingGames[i].abbreviation = this.comingPlatforms[i].abbreviation;
            }
          });
        }
      }
    });
  }

  getRecentGame() {
    this.apiService.getRecentGames().subscribe(async game_data => {
      console.log(game_data, "Request recent");
      this.recentDates = game_data;

      for (let i = 0; i < this.recentDates.length; i++) {
        await this.apiService.getGameInfo('games', this.recentDates[i].game).toPromise().then(data => {
          this.recentGames.push(data[0]);

          if (this.recentDates[i]) {
            this.recentGames[i].y = this.recentDates[i].y;
          }
        });

        if (this.recentGames[i].platforms) {
          await this.apiService.getGameInfo('platforms', this.recentGames[i].platforms[0]).toPromise().then(data => {
            this.recentPlatforms.push(data[0]);

            if (this.recentPlatforms[i]) {
              this.recentGames[i].abbreviation = this.recentPlatforms[i].abbreviation;
            }
          });
        }
      }
    });
  }

  getAnticipatedGame() {
    this.apiService.getAnticipatedGames().subscribe(async game_data => {
      console.log(game_data, "Request anticipated");
      this.anticipatedGames = game_data;
      this.showSpinner = false;

      for (let i = 0; i < this.anticipatedGames.length; i++) {
        if (this.anticipatedGames[i].release_dates) {
          await this.apiService.getGameInfo('release_dates', this.anticipatedGames[i].release_dates[0]).toPromise().then(data => {
            this.anticipatedDates.push(data[0]);

            if (this.anticipatedDates[i]) {
              this.anticipatedGames[i].y = this.anticipatedDates[i].y;
            }
          });
        }

        if (this.anticipatedGames[i].platforms) {
          await this.apiService.getGameInfo('platforms', this.anticipatedGames[i].platforms[0]).toPromise().then(data => {
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
