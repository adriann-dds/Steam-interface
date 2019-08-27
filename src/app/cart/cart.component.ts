import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Item } from '../game';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';
import { ApiService } from '../api.service';

@Component({
	templateUrl: 'index.component.html',
	// providers:[ GameComponent ]
})

@Injectable({
  providedIn: 'root'
})
export class CartComponent implements OnInit {
  private items: Item[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
		private productComponent: ProductComponent
		// private productService: ProductService
  ) { }

  ngOnInit() {
		console.log(this.items);
		// localStorage.clear();
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];

      if (id) {
        var item: Item = {
					games: this.productComponent.find(id)
				};

        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
					console.log("Length is", cart.length);
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
