import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Item } from '../game';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	providers:[ ProductComponent ],
	styleUrls: ['../game/game.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class CartComponent implements OnInit {
  private items: Item[];
	public localGame: Game;
	public id: number;
	public tableEnabled: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
		private productComponent: ProductComponent,
		private apiService: ApiService
  ) {	}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
		});

		if (this.id) {
			await this.find(this.id);
		}

      if (this.id) {
        var item: Item = {
					games: this.localGame[0]
				};

        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);

						if (item.games.id == this.id) {
              index = i;
              break;
            }
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
        await this.loadCart();
      } else {
        await this.loadCart();
      }

  }

	// public localGame: Game;

	async find(id: number) {
		await this.apiService.getGameInfoGame(id).toPromise().then(data => {
      this.localGame = data;
    })
	}

  async loadCart() {
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      await this.items.push({
        games: item.games
      });
    }

		console.log(this.items, "Cart content");
		this.tableEnabled = true;
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
