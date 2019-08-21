import { Component, OnInit } from '@angular/core';
import { Game } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Component({
	templateUrl: 'index.component.html'
})

export class ProductComponent implements OnInit {

  private games: Game[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.games = this.productService.findAll();
  }
}
