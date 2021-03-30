import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScribeVolunteerPageRoutingModule } from './scribe-volunteer-routing.module';

import { ScribeVolunteerPage } from './scribe-volunteer.page';
import { ExamListComponent } from '../shared/exam-list/exam-list.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScribeVolunteerPageRoutingModule
  ],
  declarations: [
    ScribeVolunteerPage,
    ExamListComponent,
    FooterComponent
  ]
})
export class ScribeVolunteerPageModule {}
