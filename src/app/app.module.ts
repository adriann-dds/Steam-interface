import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HttpModule, Http } from '@angular/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowseComponent } from './browse/browse.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    //MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    //AppComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
