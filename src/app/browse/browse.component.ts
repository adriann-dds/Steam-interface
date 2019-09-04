import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Game } from '../game';
import { FormControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  games: Game[] = [];
  dates: Game[] = [];
  gamesMaster: Game[] = [];
  searchTerm: FormControl = new FormControl;
  tableEnabled: boolean = false;
  // showSpinner: boolean = false;

  constructor(
    private apiService: ApiService
  ) {
    this.searchTerm.valueChanges
    .subscribe(searchTerm => this.searchGame(searchTerm))
  }

  //get game data from API

  async ngOnInit(){
    await this.apiService.getGame().toPromise().then(data => {
      this.games = data;
      this.gamesMaster = data;
    });

    this.tableEnabled = true;
  }

  //search entry

  async searchGame(filterBy: string) {
    this.tableEnabled = false;
    this.games.length = 0;

    if(filterBy.length > 0) {
      await this.apiService.searchGamesList2(filterBy).toPromise().then(data => {
        this.games = data;
      });

      await this.apiService.searchGamesList1(filterBy).toPromise().then(data => {
        this.dates = data;
      });

      // await this.apiService.searchGamesList(filterBy).subscribe(data => {
      //   // this.showSpinner = true;
      //   // console.log(this.showSpinner);
      //   this.games = data;
      // });

      console.log(this.games, this.dates);

      // this.apiService.searchGamesDates(filterBy).subscribe(data => {
      //   this.dates = data;
      // });

      // this.games.forEach (async game => await this.apiService.getGameInfoDate(game.id).toPromise().then(data => {
      //   this.dates.push(data[0]);
      //   console.log(data);
      // }))
    }
    else {
      this.games = this.gamesMaster;
    }

    this.tableEnabled = true;
    // this.showSpinner = false;
    // console.log(this.showSpinner);
  }

  sortType: string = 'sort_by_alpha';
  changeSortType() {
    if(this.sortType == 'sort_by_alpha') {
      this.sortType = 'date_range';
      this.sortByDate();
    }
    else if(this.sortType == 'date_range') {
      this.sortType = 'sort_by_alpha';
      this.sortByName();
    }
  }

  sortDirection: string = 'arrow_upward'

  changeSortDirection() {
    if(this.sortDirection == 'arrow_upward') {
      this.sortDirection = 'arrow_downward';
    }
    else if(this.sortDirection == 'arrow_downward') {
      this.sortDirection = 'arrow_upward';
    }

    this.games.reverse();
    this.dates.reverse();
  }

  sortByDate(): void {
    this.dates.sort((object1: Game, object2: Game) => {
      if(object1.y > object2.y) { return -1; }
      if(object1.y < object2.y) { return 1; }
      return 0;
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
