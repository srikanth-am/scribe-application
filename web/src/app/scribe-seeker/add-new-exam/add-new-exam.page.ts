import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RegistrationService } from 'src/app/auth/registration/registration.service';
import { ApiServiceService } from 'src/app/services/api/api-service.service';

@Component({
  selector: 'app-add-new-exam',
  templateUrl: './add-new-exam.page.html',
  styleUrls: ['./add-new-exam.page.scss'],
})
export class AddNewExamPage implements OnInit {
    addNewExamForm: FormGroup;
    exam: any = {};
    email: string = '';
    disabledId: number;
    constructor(
        private regService: RegistrationService,
        private api: ApiServiceService,
        private router: Router,
        public loadingController: LoadingController
    ) {
        this.email = localStorage.getItem('email');
        this.getUser();
        //alert(this.email);
     }

    ngOnInit() {
        this.exam = {
            exam_name: '',
            exam_date: '',
            exam_start_time: '',
            exam_end_time: '',
            exam_centre_addr: '',
            exam_city: '',
            exam_area_pincode: '',
            skills_preference: '',
            gender_preference: '',
            language_preference: '',
            disabled_id: '',
            volunteer_id:''
        }
        this.addNewExamForm = new FormGroup({
            examName: new FormControl('', {
                validators: [Validators.required]
            }),
            date: new FormControl('', {
                validators: [Validators.required]
            }),
            stime: new FormControl('', {
                validators: [Validators.required]
            }),
            etime: new FormControl('', {
                validators: [Validators.required]
            }),
            examCentre: new FormControl('', {
                validators: [Validators.required]
            }),
            city: new FormControl('', {
                validators: [Validators.required]
            }),
            pincode: new FormControl('', {
                validators: [Validators.required]
            }),
            skills: new FormControl(''),
            genderPreference: new FormControl('', {
                validators: [Validators.required]
            }),
            lanuagePreference: new FormControl('', {
                validators: [Validators.required]
            }),
        });
    }
    getUser() {
        this.api.get("/disabled/"+this.email).subscribe((res: any) => {
            console.log(res);
            if (res.id !=undefined) {
                this.disabledId = res.id;
            }
        });
    }
    onRegistrationSubmission() {
        this.loader();
        //
        if (this.addNewExamForm.valid) {
            this.exam.exam_name= this.addNewExamForm.controls['examName'].value;
            this.exam.exam_date= this.addNewExamForm.controls['date'].value;
            this.exam.exam_start_time= this.addNewExamForm.controls['stime'].value;
            this.exam.exam_end_time= this.addNewExamForm.controls['etime'].value;
            this.exam.exam_centre_addr= this.addNewExamForm.controls['examCentre'].value;
            this.exam.exam_city= this.addNewExamForm.controls['city'].value;
            this.exam.exam_area_pincode= this.addNewExamForm.controls['pincode'].value;
            this.exam.skills_preference= this.addNewExamForm.controls['skills'].value;
            this.exam.gender_preference= this.addNewExamForm.controls['genderPreference'].value;
            this.exam.language_preference= this.addNewExamForm.controls['lanuagePreference'].value;
            this.exam.disabled_id = this.disabledId;
            this.exam.volunteer_id = '';
            this.api.post("/saveExam", this.exam).subscribe((res: any) => {
                alert("SUccessfully Added");
                this.router.navigate(['/scribe-seeker']);
            });
            // console.log(this.exam);?
        } else {
            this.regService.onSubmission(this.addNewExamForm);
        }
        //
    }
    async loader() {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 500
      });
      await loading.present();
    }
}
