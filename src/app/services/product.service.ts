import { Injectable } from '@angular/core';
import { Game } from '../game';
import { GameComponent } from '../game/game.component';

@Injectable()
export class ProductService {
  private games: Game[];

  constructor() {
        this.games = [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' }
        ];
    }

  findAll(): Game[] {
    return this.games;
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
