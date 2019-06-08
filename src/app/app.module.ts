import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VoterComponent} from './voter/voter.component';
import {VoteComponent} from './voter/vote/vote.component';
import {AdminComponent} from './admin/admin.component';
import {ResultComponent} from './result/result.component';
import {NavBarComponent} from './admin/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {LoginComponent} from './admin/nav-bar/login/login.component';
import {VoterRegisterComponent} from './admin/nav-bar/voter-register/voter-register.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    VoteComponent,
    AdminComponent,
    ResultComponent,
    NavBarComponent,
    LoginComponent,
    VoterRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule
  ],
  // exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
