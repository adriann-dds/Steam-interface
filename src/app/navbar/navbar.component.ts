import { Component, OnInit } from '@angular/core';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AuthService } from 'src/app/auth.service';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLocation: string;

  isAuthenticated = false;
  profile: any;

  public auth0Client: Auth0Client;

  //Constructor to inject the Auth0Client class

  constructor(
    public authService: AuthService,
    public location: Location,
    public router: Router
  ) { }

  //Initialisation component

  async ngOnInit() {
    await this.router.events.subscribe(data => {
      this.navLocation = this.location.path().slice(0, 5);
    });

    //Get instane of the Auth0 client

    this.auth0Client = await this.authService.getAuth0Client();

    //Monitor isAuthenticated's state

    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });

    //Monitor profile data

    this.authService.profile.subscribe(profile => {
      this.profile = profile;
    });
  }

  //Logs in the user by redirecting to Auth0 service

  async login() {
    await this.auth0Client.loginWithRedirect({});
  }

  //Logs out of the app and Auth0 service

  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }
}
