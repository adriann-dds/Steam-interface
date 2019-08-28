import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Item } from '../game';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	providers:[ ProductComponent ]
})

@Injectable({
  providedIn: 'root'
})
export class CartComponent implements OnInit {
  private items: Item[];
	item: Item;

  constructor(
    private activatedRoute: ActivatedRoute,
		private productComponent: ProductComponent,
		private apiService: ApiService
  ) {	}

  ngOnInit() {
		// localStorage.clear();
		// localStorage.removeItem('currentGame');

		// this.apiService.searchGameByID(id).subscribe(data => {
		//
		// })

    this.activatedRoute.params.subscribe(params => {
			console.log(params, "Simple", params['id'], "Element");
      var id = params['id'];

      if (id) {
				//let localGame: Game;

				// this.apiService.getGameInfoGame(id).subscribe(data => {
		    //   this.localGame = data;
				// 	console.log(data, "ProductComponent");
		    // })

				// console.log(this.localGame);

        var item: Item = {
					games: this.find(id)
				};

				console.log(this.item);

        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(this.item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
					console.log(cart, "Cart");
          let index: number = -1;
					console.log("Length is", cart.length);
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);

						// if (item.games) {
							if (item.games.id == id) {
	              index = i;
	              break;
	            }
						// }
          }

          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }

	find(id: number): Game {
		let localGame: Game;

		this.apiService.getGameInfoGame(id).subscribe(data => {
      localGame = data;
			console.log(data, "ProductComponent");
    })

		return localGame;
	}

  loadCart(): void {
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        games: item.games
      });
    }

		console.log(this.items, "Final");
  }

  remove(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;

    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);

      if (item.games.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }
}
