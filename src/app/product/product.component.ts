import { Component, OnInit, Injectable } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { Game } from '../game';

@Component({
	templateUrl: 'index.component.html',
	providers:[ GameComponent ]
})

export class ProductComponent implements OnInit {

	constructor(private gameComponent: GameComponent) { }

	ngOnInit() {
		console.log(this.gameComponent.games, "Product component");
	}

}
