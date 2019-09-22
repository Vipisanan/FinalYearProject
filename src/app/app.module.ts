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
import {DialogDataExampleDialog, VoterRegisterComponent} from './admin/nav-bar/voter-register/voter-register.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { PartyRegisterComponent } from './admin/nav-bar/party-register/party-register.component';
import { CandidateRegisterComponent } from './admin/nav-bar/candidate-register/candidate-register.component';
import { AddElectionComponent } from './admin/nav-bar/add-election/add-election.component';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { VoterListComponent } from './admin/nav-bar/voter-list/voter-list.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserListComponent } from './admin/nav-bar/user-list/user-list.component';
import { PartyListComponent } from './admin/nav-bar/party-list/party-list.component';
import { CandidateListComponent } from './admin/nav-bar/candidate-list/candidate-list.component';



@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    VoteComponent,
    AdminComponent,
    ResultComponent,
    NavBarComponent,
    LoginComponent,
    VoterRegisterComponent,
    PartyRegisterComponent,
    CandidateRegisterComponent,
    AddElectionComponent,
    DialogDataExampleDialog,
    VoterListComponent,
    UserListComponent,
    PartyListComponent,
    CandidateListComponent
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
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    DialogDataExampleDialog
  ],
  // exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
