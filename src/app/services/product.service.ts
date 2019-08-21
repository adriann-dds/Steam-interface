import { Injectable } from '@angular/core';
import { Game } from '../entities/product.entity';

@Injectable()
export class ProductService {
  private games: Game[];

  constructor() {
        this.games = [
            { id: 'p01', name: 'name 1', price: 100 },
            { id: 'p02', name: 'name 2', price: 200 },
            { id: 'p03', name: 'name 3', price: 300 }
        ];
    }

  findAll(): Game[] {
    return this.games;
  }

  find(id: string): Game {
    return this.games[this.getSelectedIndex(id)]
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].id == id) {
        return i;
      }
    }

    return -1;
  }
}
