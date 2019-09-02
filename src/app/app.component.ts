import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(data => {
      switch (location.path().slice(0, 5)) {
        case "/game":
          this.title = "Top 10 games";
          break;

        case "/brow":
          this.title = "Browsed games";
          break;

        case "/cart":
          this.title = "Favorites";
          break;

        case "/deta":
          this.title = "Game details";
          break;

        default:
        this.title = "Home";
        break;
      }
    });
  }
}
