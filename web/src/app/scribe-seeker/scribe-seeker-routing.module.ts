import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScribeSeekerPage } from './scribe-seeker.page';

const routes: Routes = [
  {
    path: '',
    component: ScribeSeekerPage
  },
  {
    path: 'add-new-exam',
    loadChildren: () => import('./add-new-exam/add-new-exam.module').then( m => m.AddNewExamPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ScribeSeekerPageRoutingModule {}
