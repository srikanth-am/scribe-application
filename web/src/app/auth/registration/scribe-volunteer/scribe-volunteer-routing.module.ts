import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScribeVolunteerPage } from './scribe-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: ScribeVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScribeVolunteerPageRoutingModule {}
