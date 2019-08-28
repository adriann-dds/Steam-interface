import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
// import { ProductService } from '../services/product.service';
//import { CartComponent } from '../cart/cart.component';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	//providers: [ CartComponent ]
})

 export class ProductComponent implements OnInit {

   private games: Game[] = [];

   constructor(
		 private apiService: ApiService,
		 //private cartComponent: CartComponent
	 ) {
		 this.games = [
				 { id: 4444321, name: 'name 1' },
				 { id: 4444322, name: 'name 2' },
				 { id: 4444333, name: 'name 3' }
		 ];
	 }

	async ngOnInit(){
    // await this.apiService.getGame().subscribe(data => {
    //     //this.games = data;
		// 		for (var i = 0; i < data.length; i++) {
		// 			this.games.push(<Game>data[i]);
		// 		}
		//
		// 		console.log(this.games, "From the component");
		// 	}
		// );
  }

	// addItem(id: number) {
	// 	this.cartComponent.addItemToCart(id);
	// }

	// find(id: number): Game {
	// 	let localGame: Game;
	//
	// 	this.apiService.getGameInfoGame(id).subscribe(data => {
  //     localGame = data;
	// 		console.log(data, "ProductComponent");
  //   })
	//
	// 	return localGame;
	// }

	// find(id: number): Game {
  //   return this.games[this.getSelectedIndex(id)]
  // }

  // private getSelectedIndex(id: number) {
  //   for (var i = 0; i < this.games.length; i++) { //this.games.length
  //     if (this.games[i].id == id) {
  //       return i;
  //     }
  //   }
	//
  //   return -1;
  // }
}
