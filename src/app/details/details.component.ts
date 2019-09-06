import { Component, OnInit, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Game } from '../game';

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
  public localWebsite: Game;
  public localVideo: Game;
  public id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
		private apiService: ApiService,
    private sanitizer: DomSanitizer
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
		await this.apiService.getGameInfoGame(id).toPromise().then(async data => {
      this.localGame = data[0];

      await this.apiService.getGameInfoDate(id).toPromise().then(async data => {
        this.localDate = data[0];

        await this.apiService.getGameInfoWebsite(id).toPromise().then(async data => {
          this.localWebsite = data[0];

          await this.apiService.getGameInfoVideo(id).toPromise().then(data => {
            this.localVideo = data[0];

          })
        })
      })

      console.log(this.localGame, this.localDate, this.localWebsite, this.localVideo);
      this.showSpinner = false;
    })
	}

  returnVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.localVideo.video_id);
  }
}
