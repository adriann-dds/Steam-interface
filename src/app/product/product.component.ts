import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { ProductService } from '../services/product.service';
import { GameComponent } from '../game/game.component';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	providers: [ GameComponent ]
})

 export class ProductComponent implements OnInit {

   private games: Game[];

   constructor(
		 private productService: ProductService,
		 private gameComponent: GameComponent,
		 private apiService: ApiService
	 ) { }

  //  ngOnInit() {
	// 	this.games = this.productService.findAll();
	// 	console.log(this.games, "Initial");
	//
  //   this.games = this.gameComponent.getGames();
	// 	console.log(this.games, "From the component");
  // }

	async ngOnInit(){
    await this.apiService.requestMultipleApi().subscribe(data => {
        this.games = data[0];
				console.log(data[0], "From the component");
        })
  }

	find(id: number): Game {
    return this.games[this.getSelectedIndex(id)]
  }

  private getSelectedIndex(id: number) {
    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].id == id) {
        return i;
      }
    }

    return -1;
  }
}
