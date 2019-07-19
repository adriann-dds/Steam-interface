import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BrowseComponent } from './browse/browse.component';

const routes: Routes = [
  {path: 'games', component: GameComponent},
  {path: 'browse', component: BrowseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
