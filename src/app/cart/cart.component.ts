import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game';
import { Item } from '../entities/item.entity';
import { ProductService } from '../services/product.service';
import { GameComponent } from '../game/game.component';

@Component({
	templateUrl: 'index.component.html'
})

export class CartComponent implements OnInit {
  private items: Item[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
		// private gameComponent: GameComponent
  ) { }

  ngOnInit() {
		// localStorage.clear();
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];

      if (id) {
        var item: Item = {
					games: this.productService.find(id)
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

            if (item.games.id == id) {
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
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
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

		console.log(this.items);
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
