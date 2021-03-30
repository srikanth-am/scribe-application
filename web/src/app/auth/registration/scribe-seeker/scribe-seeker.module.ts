import { NgModule } from '@angular/core';

import { ScribeSeekerPageRoutingModule } from './scribe-seeker-routing.module';
import { ScribeSeekerPage } from './scribe-seeker.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidationPopupComponent } from '../validation-popup/validation-popup.component';

@NgModule({
  imports: [
    SharedModule,
    ScribeSeekerPageRoutingModule
  ],
  declarations: [
    ScribeSeekerPage,
    ValidationPopupComponent]
})
export class ScribeSeekerPageModule {}
