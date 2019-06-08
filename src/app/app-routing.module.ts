import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VoteComponent} from './voter/vote/vote.component';
import {VoterComponent} from './voter/voter.component';
import {AdminComponent} from './admin/admin.component';
import {ResultComponent} from './result/result.component';

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
    component: AdminComponent
  },
  {
    path: 'path',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
