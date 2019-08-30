import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BrowseComponent } from './browse/browse.component';
import { CallbackComponent } from './callback/callback.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

//Importing the profile component
import { ProfileComponent } from './profile/profile.component';

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
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },

  //Add route to the profile component

  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
