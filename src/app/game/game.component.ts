import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';
import { FormControl } from '@angular/forms';
import {Http, Headers, Response} from '@angular/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input('GamesInput') games: Game[] = [];
  gamesMaster: Game[] = [];
  //games: Game[] = [];
  searchTerm: FormControl = new FormControl;
  tableEnabled: boolean = false;

  constructor(private apiService: ApiService) {
    //this.getGame()
  }

  //get game data from API

  async ngOnInit(){
    await this.apiService.getGame().subscribe(data => {
        this.games = data;
        this.gamesMaster = data;
        })

    //this.tableEnabled = true;
  }

  //get game data from API
/*
  getGame() {
    this.apiService.getGame().subscribe(data => {
      console.log(data);
      this.games = data;
    });
  }
*/
  //get data from local imported files

  getGameCover(game : Game): string {
    return (game.cover.url);
  }

  getGameScreenshot(game : Game): string {
    return (game.screenshot.url);
  }

  //search entry

  testButton() {
    console.log(this.games);
  }

  async searchGame(filterBy: string) {
    this.tableEnabled = false;
    this.games.length = 0;

    if(filterBy) {
      this.apiService.searchGames(filterBy).subscribe(data => {
        this.games = data;
      });

    }
    else {
      this.games = this.gamesMaster;
    }

    this.tableEnabled = true;
  }

  sortType: string = 'Name';
  changeSortType() {
    if(this.sortType == 'Name') {
      this.sortType = 'Date';
      this.sortByDate();
    }
    else if(this.sortType == 'Date') {
      this.sortType = 'Name';
      this.sortByName();
    }
  }

  sortDirection: string = 'Ascending'

  changeSortDirection() {
    if(this.sortDirection == 'Ascending') {
      this.sortDirection = 'Descending';
    }
    else if(this.sortDirection == 'Descending') {
      this.sortDirection = 'Ascending';
    }

    this.games.reverse();
  }

  sortByDate(): void {
    this.games.sort((object1: Game, object2: Game) => {
      let date1 = new Date(object1.release_dates[0].human)
      let date2 = new Date(object2.release_dates[0].human)
      return (date1.getFullYear() - date2.getFullYear());
    });
  }

  sortByName(): void {
    this.games.sort((object1: Game, object2: Game) => {
      if(object1.name > object2.name) { return -1; }
      if(object1.name < object2.name) { return 1; }
      return 0;
    });
  }
}
