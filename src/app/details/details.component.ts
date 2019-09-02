import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class DetailsComponent implements OnInit {
  public showSpinner: boolean = true;
  public localGame: Game;
  public localDate: Game;
  public id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
		private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
		});

		if (this.id) {
			await this.find(this.id);
		}
  }

  //get info from API

	async find(id: number) {
		await this.apiService.getGameInfoGame(id).toPromise().then(data => {
      this.localGame = data[0];
      console.log(this.localGame);
      this.showSpinner = false;
    })

    await this.apiService.getGameInfoDate(id).toPromise().then(data => {
      this.localDate = data[0];
      console.log(this.localDate);
      this.showSpinner = false;
    })
	}
}
