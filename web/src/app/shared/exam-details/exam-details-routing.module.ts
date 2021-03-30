import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamDetailsPage } from './exam-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExamDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamDetailsPageRoutingModule {}
