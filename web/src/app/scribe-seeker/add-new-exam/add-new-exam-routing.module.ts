import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewExamPage } from './add-new-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewExamPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)]
    ,
  exports: [RouterModule],
})
export class AddNewExamPageRoutingModule {}
