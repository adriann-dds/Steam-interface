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
  comingGames: Game[] = [];
  popularDates: Game[] = [];
  comingDates: Game[] = [];
  recentGames: Game[] = [];
  recentDates: Game[] = [];
  platforms: Game[] = [];
  showSpinner: boolean = true;

  constructor(private apiService: ApiService) { }

  async ngOnInit(){
    await this.getPopularGame();
    await this.getComingGame();
    await this.getRecentGame();
  }

  //get game data from API

  getPopularGame() {
    this.apiService.getPopularGames().subscribe(async game_data => {
      console.log(game_data, "Request popular");
      this.popularGames = game_data;
      this.showSpinner = false;


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
            this.platforms.push(data[0]);

            if (this.platforms[i]) {
              this.popularGames[i].abbreviation = this.platforms[i].abbreviation;
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
      this.showSpinner = false;

      for (let i = 0; i < this.comingDates.length; i++) {
        await this.apiService.getGameInfo('games', this.comingDates[i].game).toPromise().then(data => {
          this.comingGames.push(data[0]);

          if (this.comingDates[i]) {
            this.comingGames[i].y = this.comingDates[i].y;
          }
        });
      }
    });
  }

  getRecentGame() {
    this.apiService.getRecentGames().subscribe(async game_data => {
      console.log(game_data, "Request recent");
      this.recentDates = game_data;
      this.showSpinner = false;

      for (let i = 0; i < this.recentDates.length; i++) {
        await this.apiService.getGameInfo('games', this.recentDates[i].game).toPromise().then(data => {
          this.recentGames.push(data[0]);

          if (this.recentDates[i]) {
            this.recentGames[i].y = this.recentDates[i].y;
          }
        });
      }
    });
  }
}
