import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BrowseComponent } from './browse/browse.component';
import { CallbackComponent } from './callback/callback.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { GamelistComponent } from './gamelist/gamelist.component';

const routes: Routes = [
  {
    path: 'games',
    component: GameComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'gamelist',
    component: GamelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
