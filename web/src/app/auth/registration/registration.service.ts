import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ValidationPopupComponent } from './validation-popup/validation-popup.component';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor( public modalController: ModalController) { }

  validatePasswordConformPassword(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  onSubmission(regForm) {
    this.modalController.create({
      component: ValidationPopupComponent,
      componentProps: {controls: regForm.controls}
    }).then(modalEl => {
      modalEl.present();
    });
  }
}
