import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent implements OnInit {
  @Input() examList: any[];

  constructor() { }

  ngOnInit() {}

}
