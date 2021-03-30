import { Router } from '@angular/router';
import { ApiServiceService } from './../../../services/api/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { LoadingController } from '@ionic/angular';

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
        public loadingController: LoadingController
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
                    alert("Registered Successfully");
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
    // async presentLoading() {
    //     const loading = await this.loadingController.create({
    //         cssClass: 'my-custom-class',
    //         message: 'Please wait...',
    //         //duration: 2000
    //     });
    //     await loading.present();

    //     const { role, data } = await loading.onDidDismiss();
    //     console.log('Loading dismissed!');
    // }

//   async presentLoadingWithOptions() {
//     const loading = await this.loadingController.create({
//       spinner: null,
//       duration: 5000,
//       message: 'Click the backdrop to dismiss early...',
//       translucent: true,
//       cssClass: 'custom-class custom-loading',
//       backdropDismiss: true
//     });
//     await loading.present();

//     const { role, data } = await loading.onDidDismiss();
//     console.log('Loading dismissed with role:', role);
//   }
}
