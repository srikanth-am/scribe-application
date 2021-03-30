import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamDetailsPageRoutingModule } from './exam-details-routing.module';

import { ExamDetailsPage } from './exam-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamDetailsPageRoutingModule
  ],
  declarations: [ExamDetailsPage]
})
export class ExamDetailsPageModule {}
