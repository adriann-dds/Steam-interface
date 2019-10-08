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
  public id: number;
  public length: number;
  public localGame: Game;
  public localDate: Game;
  public localVideo: Game;
  public localWebsite: Game;
  public localPlatform: Game[] = [];
  public showSpinner: boolean = true;
  public localScreenshots: Game[] = [];

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
		await this.apiService.getGamesData('games/' + id, '').toPromise().then(async data => {
      this.localGame = data[0];
    })

    if (this.localGame.release_dates) {
      await this.apiService.getGamesData('release_dates/' + this.localGame.release_dates[0], '').toPromise().then(async data => {
        this.localDate = data[0];
      })
    }

    if (this.localGame.websites) {
      await this.apiService.getGamesData('websites/' + this.localGame.websites[0], '').toPromise().then(async data => {
        this.localWebsite = data[0];
      })
    }

    if (this.localGame.videos) {
      await this.apiService.getGamesData('game_videos/' + this.localGame.videos[0], '').toPromise().then(async data => {
        this.localVideo = data[0];
      })
    }

    if (this.localGame.platforms) {
      for (var i = 0; i < this.localGame.platforms.length; i++) {
        await this.apiService.getGamesData('platforms/' + this.localGame.platforms[i], '').toPromise().then(data => {
          if (data[0].abbreviation) {
            this.localPlatform.push(data[0]);
          }
        })
      }
    }

    if (this.localGame.screenshots) {
      if (this.localGame.screenshots.length > 6) {
        length = 6;
      } else {
        length = this.localGame.screenshots.length;
      }

      for (var i = 0; i < length; i++) {
        await this.apiService.getGamesData('screenshots/' + this.localGame.screenshots[i], '').toPromise().then(async data => {
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
