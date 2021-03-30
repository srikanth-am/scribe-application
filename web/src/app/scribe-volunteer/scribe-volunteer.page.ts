import { ApiServiceService } from './../services/api/api-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scribe-volunteer',
  templateUrl: './scribe-volunteer.page.html',
  styleUrls: ['./scribe-volunteer.page.scss'],
})
export class ScribeVolunteerPage implements OnInit {
  //examList = [];

  constructor(private api:ApiServiceService, public alertController: AlertController) { }
    examList: any = [];
    ngOnInit() {
        this.getData();
  }
    getData() {
        this.api.get("/volunteerExamDashboard/arun@gmail.com").subscribe((res: any) => {
            this.examList = res;
        });
    }
    buttonClick() {
        this.presentAlertConfirm();
    }
     async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: '<strong>Do you want to accept this exam?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
