import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScribeSeekerPage } from './scribe-seeker.page';

const routes: Routes = [
  {
    path: '',
    component: ScribeSeekerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScribeSeekerPageRoutingModule {}
