import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-validation-popup',
  templateUrl: './validation-popup.component.html',
  styleUrls: ['./validation-popup.component.scss'],
})
export class ValidationPopupComponent implements OnInit {
  @Input() controls;

  ctrlMap = {
    'name': 'Name',
    'email': 'E-Mail',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'gender': 'Gender',
    'degree': 'Degree',
    'specialization': 'Specialization',
    'languagesKnown': 'Languages Known',
    'city': 'City',
    'state' :'State',
    'pincode': 'Pincode',
    'examName':'Exam Name',
    'address': 'Exam Location Address',
    'examCity': 'Exam City',
    'date':'Exam Date',
    'time':'Exam Time',
    'skills': 'Skills Expected From Volunteer'
  };

  errors: any[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    for (const ctrl in this.controls) {
      const err = this.controls[ctrl].errors;
      err && err.required && (this.errors.push(`${this.ctrlMap[ctrl]} can't be blank.`))
      if(this.controls[ctrl].controls) {
        for (const subCtrl in this.controls[ctrl].controls) {
          const err = this.controls[ctrl].controls[subCtrl].errors;
          err && err.required && (this.errors.push(`${this.ctrlMap[subCtrl]} can't be blank.`))
          err && err.minlength && (this.errors.push(`${this.ctrlMap[subCtrl]} should be minimum ${err.minlength.requiredLength} characters length.`));
        }
      }
    }
    this.controls['passwords'].controls['password'].value !==  this.controls['passwords'].controls['confirmPassword'].value && this.errors.push(`Password and confirm password are not matching`)
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
