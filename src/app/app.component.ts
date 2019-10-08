import { Component, OnInit, Input } from '@angular/core';
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
        case "/home":
          this.title = "Home";
          break;

        case "/brow":
          this.title = "";
          break;

        case "/cart":
          this.title = "Favorites";
          break;

        case "/deta":
          this.title = "";
          break;

        default:
        this.title = "";
        break;
      }
    });
  }
}
