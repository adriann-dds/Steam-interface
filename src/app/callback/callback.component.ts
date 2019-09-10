import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: ''
})
export class CallbackComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  async ngOnInit() {
    const client = await this.authService.getAuth0Client();

    //Redirect from Auth0

    const result = await client.handleRedirectCallback();

    //Get the initial url accesed by the user

    const targetRoute = result.appState && result.appState.target ? result.appState.target : '';

    //Update observables

    this.authService.isAuthenticated.next(await client.isAuthenticated());
    this.authService.profile.next(await client.getUser())

    //Redirect

    this.router.navigate([targetRoute]);
  }
}
