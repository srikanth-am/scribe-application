import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) {

  }

  presentModal(component, props) {
    this.modalController.create({
      component: component,
      componentProps: props
    }).then(modalEl => {
      modalEl.present();
    });
  }
}
