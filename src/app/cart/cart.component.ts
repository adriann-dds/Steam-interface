import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Item } from '../game';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	styleUrls: ['../game/game.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class CartComponent implements OnInit {
	public id: number;
	private items: Item[];
	public localGame: Game;
	public localData: Game;
	public tableEnabled: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
		private apiService: ApiService
  ) {	}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
		});

		if (this.id) {
			await this.findGame(this.id);
			// console.log(this.localGame.release_dates);
		}

		console.log(this.localGame , this.localData);

      if (this.id) {
        var item: Item = {
					games: this.localGame[0]
				};

				if (this.localData[0]) {
					item.games.y = this.localData[0].y;
				}

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

	//get info from API

	async findGame(id: number) {
		await this.apiService.getGameInfo('games', id).toPromise().then(async data => {
      this.localGame = data;

			// console.log(this.localGame.release_dates);

			await this.apiService.getGameInfo('release_dates', id).toPromise().then(data => {
	      this.localData = data;
	    })
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

	//remove element from favorites

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
