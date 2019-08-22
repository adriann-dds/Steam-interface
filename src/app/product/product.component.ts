import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../game';
import { ProductService } from '../services/product.service';
import { GameComponent } from '../game/game.component';

@Component({
	templateUrl: 'index.component.html'
})

export class ProductComponent {

	@ViewChild(GameComponent, {static: false}) child: GameComponent;

	constructor() {	}

	games: Game;

	ngAfterViewInit() {
		this.child.getGame();
		this.games = this.child.games;
		console.log(this.games);
  }

}
