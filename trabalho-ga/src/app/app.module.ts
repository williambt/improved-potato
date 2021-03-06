import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PhaserModule } from 'phaser-component-library';

import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
/**
 * Application module.
 */
@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    PhaserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Instantiate application module.
   *
   * @param appRef Application reference, needed for [HMR](../hmr.ts).
   */
  public constructor(public appRef: ApplicationRef) { }
}
