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

    // document.addEventListener("wheel", function(e) {
    //   e.preventDefault();
    // }, {
    //   capture: true,
    //   passive: true
    // });

    // document.ontouchmove = function(event) {
    //   event.preventDefault();
    // }

    // addEventListener(document, "touchstart", function(e) {
    //   console.log(e.defaultPrevented); //false
    //   e.preventDefault; //does nothing -> listener is passive
    //   console.log(e.defaultPrevented); //still false
    // }, Modernizr.passiveeventlisteners ? {passive: true} :false);
  }

  //get info from API

	async find(id: number) {
		await this.apiService.getGameInfo('games', id).toPromise().then(async data => {
      this.localGame = data[0];
    })

    await this.apiService.getGameInfo('release_dates', this.localGame.release_dates[0]).toPromise().then(async data => {
      this.localDate = data[0];
    })

    if (this.localGame.websites) {
      await this.apiService.getGameInfo('websites', this.localGame.websites[0]).toPromise().then(async data => {
        this.localWebsite = data[0];
      })
    }

    if (this.localGame.videos) {
      await this.apiService.getGameInfo('game_videos', this.localGame.videos[0]).toPromise().then(async data => {
        this.localVideo = data[0];
      })
    }

    if (this.localGame.platforms) {
      for (var i = 0; i < this.localGame.platforms.length; i++) {
        await this.apiService.getGameInfo('platforms', this.localGame.platforms[i]).toPromise().then(data => {
          this.localPlatform.push(data[0]);
        })
      }
    }

    if (this.localGame.screenshots) {
      for (var i = 0; i < this.localGame.screenshots.length; i++) {
        await this.apiService.getGameInfo('screenshots', this.localGame.screenshots[i]).toPromise().then(async data => {
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
