import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the game list';
  subtitle = 'Top 10 popular games';

  public getNewText(newText: string) {
    this.subtitle = newText;
  }

  constructor() {}
}
