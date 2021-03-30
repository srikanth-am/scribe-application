import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { ValidationPopupComponent } from '../validation-popup/validation-popup.component';
import { LoadingController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-scribe-volunteer',
  templateUrl: './scribe-volunteer.page.html',
  styleUrls: ['./scribe-volunteer.page.scss'],
})
export class ScribeVolunteerPage implements OnInit {
  registrationForm: FormGroup;
    volunteer: any = {};
    constructor(
        private regService: RegistrationService,
        public loadingController: LoadingController,
        private api: ApiServiceService,
        private router: Router

    ) { }

    ngOnInit() {
        this.volunteer = {
            name: "",
            email: "",
            password: "",
            mobile: "",
            gender: "",
            city_town_village: "",
            state: "",
            pincode: "",
            language_1: "",
            language_2: "",
            language_3: "",
            highest_degree: ""
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
        },
        {validators: this.regService.validatePasswordConformPassword}),
        gender: new FormControl('', {
            validators: [Validators.required]
        }),
        languagesKnown: new FormControl('', {
            validators: [Validators.required]
        }),
        mobileno: new FormControl(''),
        degree:new FormControl('', {
            validators: [Validators.required]
        }),
        // specialization:new FormControl('', {
        //     validators: [Validators.required]
        // }),
        city:new FormControl('', {
            validators: [Validators.required]
        }),
        state:new FormControl('', {
            validators: [Validators.required]
        }),
        pincode:new FormControl('', {
            validators: [Validators.required]
        }),
    });
  }

    onRegistrationSubmission() {
      this.loader();
        if (this.registrationForm.valid) {
            this.volunteer.name = this.registrationForm.controls['name'].value;
            this.volunteer.email = this.registrationForm.controls['email'].value;
            this.volunteer.password = this.registrationForm.get('passwords').get('password').value;
            //this.volunteer.mobile = this.registrationForm.controls['name'].value;
            this.volunteer.gender = this.registrationForm.controls['gender'].value;
            this.volunteer.city_town_village = this.registrationForm.controls['city'].value;
            this.volunteer.state = this.registrationForm.controls['pincode'].value;
            this.volunteer.pincode = this.registrationForm.controls['gender'].value;
            this.volunteer.language_1 = this.registrationForm.controls['languagesKnown'].value;
            this.volunteer.language_2 = 'none';
            this.volunteer.language_3 = 'none';
            this.volunteer.highest_degree = this.registrationForm.controls['degree'].value;
            this.api.post("/volunteerRegister", this.volunteer).subscribe((res: any) => {
                if (Object.keys(res).length > 0) {
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

}
