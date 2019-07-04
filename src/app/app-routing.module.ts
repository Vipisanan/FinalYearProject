import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VoteComponent} from './voter/vote/vote.component';
import {VoterComponent} from './voter/voter.component';
import {AdminComponent} from './admin/admin.component';
import {ResultComponent} from './result/result.component';
import {LoginComponent} from './admin/nav-bar/login/login.component';
import {VoterRegisterComponent} from './admin/nav-bar/voter-register/voter-register.component';
import {PartyRegisterComponent} from './admin/nav-bar/party-register/party-register.component';
import {CandidateRegisterComponent} from './admin/nav-bar/candidate-register/candidate-register.component';
import {AddElectionComponent} from './admin/nav-bar/add-election/add-election.component';

const routes: Routes = [
  {
    path: '',
    component: VoterComponent,
    children: [
      {
        path: '',
        component: VoteComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'voter-register',
        component: VoterRegisterComponent
      },
      {
        path: 'party-register',
        component: PartyRegisterComponent
      },
      {
        path: 'candidate-register',
        component: CandidateRegisterComponent
      },
      {
        path: 'add-election',
        component : AddElectionComponent
      },
      {
        path: 'result',
        component: ResultComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
