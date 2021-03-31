import { Router } from '@angular/router';
import { ApiServiceService } from './../../../services/api/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scribe-seeker',
  templateUrl: './scribe-seeker.page.html',
  styleUrls: ['./scribe-seeker.page.scss'],
})
export class ScribeSeekerPage implements OnInit {
    seeker: any = {};
  registrationForm: FormGroup;
    constructor(
        private regService: RegistrationService,
        private api: ApiServiceService,
        private router: Router,
        public loadingController: LoadingController,
        public alertController: AlertController
    ) { }

    ngOnInit() {
        this.seeker = {
            loader: false,
            data: {
                name: '',
                email: '',
                password: '',
                mobile:''
            }
      }
    this.registrationForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }, {validators: this.regService.validatePasswordConformPassword}),
   
      mobileno: new FormControl(''),
    });
  }

    onRegistrationSubmission() {
        this.loader();
        if (this.registrationForm.valid) {
            this.seeker.data.name = this.registrationForm.controls['name'].value;
            this.seeker.data.email = this.registrationForm.controls['email'].value;
            this.seeker.data.password = this.registrationForm.get('passwords').get('password').value;
            this.seeker.data.mobile = this.registrationForm.controls['mobileno'].value;
            this.api.post("/disabledRegister", this.seeker.data).subscribe((res: any) => {
                if (Object.keys(res).length > 3) {
                    this.presentAlert();
                    this.router.navigate(['/login']);
                }
            });
        } else {
            this.regService.onSubmission(this.registrationForm);
        }
    }
    async loader() {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 500
      });
      await loading.present();
    }
    async presentAlert() {
        const alert = await this.alertController.create({
            message: 'Registered Successfully',
            buttons: ['OK']
        });
        await alert.present();
    }
}
