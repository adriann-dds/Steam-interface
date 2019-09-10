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
  public localPlatform: Game[] = [];
  public localScreenshots: Game[] = [];
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
    })

    await this.apiService.getGameInfoDate(this.localGame.release_dates[0]).toPromise().then(async data => {
      this.localDate = data[0];
    })

    if (this.localGame.websites) {
      await this.apiService.getGameInfoWebsite(this.localGame.websites[0]).toPromise().then(async data => {
        this.localWebsite = data[0];
      })
    }

    if (this.localGame.videos) {
      await this.apiService.getGameInfoVideo(this.localGame.videos[0]).toPromise().then(async data => {
        this.localVideo = data[0];
      })
    }

    if (this.localGame.platforms) {
      for (var i = 0; i < this.localGame.platforms.length; i++) {
        await this.apiService.getGameInfoPlatform(this.localGame.platforms[i]).toPromise().then(data => {
          this.localPlatform.push(data[0]);
        })
      }
    }

    if (this.localGame.screenshots) {
      for (var i = 0; i < this.localGame.screenshots.length; i++) {
        await this.apiService.getGameInfoScreenshots(this.localGame.screenshots[i]).toPromise().then(async data => {
          this.localScreenshots.push(data[0]);
        })
      }
    }

    console.log(this.localGame, this.localDate, this.localWebsite, this.localVideo, this.localScreenshots, this.localPlatform);
    this.showSpinner = false;
	}

  returnVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.localVideo.video_id);
  }
}
