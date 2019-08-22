import { Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../game';
import { GameComponent } from '../game/game.component';

@Injectable()
export class ProductService implements AfterViewInit {

  @ViewChild(GameComponent, {static: false}) child: GameComponent;

  constructor() {	}

  games: Game;

  ngAfterViewInit() {
    // this.child.getGame();
    this.games = this.child.games;
    console.log(this.games);
  }

  findAll(): Game {
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
