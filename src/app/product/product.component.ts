import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html'
})

 export class ProductComponent implements OnInit {

   private games: Game[] = [];

   constructor(
		 private apiService: ApiService
	 ) {
	 }

	async ngOnInit(){
    await this.apiService.getGame().subscribe(data => {
				for (var i = 0; i < data.length; i++) {
					this.games.push(<Game>data[i]);
				}
			}
		);
  }
}
