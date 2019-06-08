import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoterComponent } from './voter/voter.component';
import { VoteComponent } from './voter/vote/vote.component';
import { AdminComponent } from './admin/admin.component';
import { ResultComponent } from './result/result.component';
import { NavBarComponent } from './admin/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    VoteComponent,
    AdminComponent,
    ResultComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
