import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);


  public auth0Client: Auth0Client;

  //Auth0 app configuration

  config = {
    domain: "dev-j1ww009n.eu.auth0.com",
    client_id: "jaXODYUT78DaBVZT2ZoVHkbMvFSlD5pc",
    redirect_uri: `${window.location.origin}/callback`
  };

  //Getting the Auth0 instance

  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client(this.config);

      //Curent falue of isAuthenticated

      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

      //When isAuthenticated changes, provide the current value of 'getUser()'

      this.isAuthenticated.subscribe(async isAuthenticated => {
          if (isAuthenticated) {
            this.profile.next(await this.auth0Client.getUser());

            return;
          }

          this.profile.next(null);
        });
      }

      return this.auth0Client;
    }

  constructor() { }
}
