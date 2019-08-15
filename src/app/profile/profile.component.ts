import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.profile.subscribe(profile =>(this.profile = profile));
  }

  getNickname() {
    return this.profile.nickname;
  }
}
