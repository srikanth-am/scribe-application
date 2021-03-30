import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.page.html',
  styleUrls: ['./exam-details.page.scss'],
})
export class ExamDetailsPage implements OnInit {
  @Input() exam;

  constructor() { }

  ngOnInit() {
  }

}
