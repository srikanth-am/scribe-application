import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api/api-service.service';

@Component({
  selector: 'app-scribe-seeker',
  templateUrl: './scribe-seeker.page.html',
  styleUrls: ['./scribe-seeker.page.scss'],
})
export class ScribeSeekerPage implements OnInit {
  examList = []; //  integrate with service
 email: string = '';
    constructor(private api: ApiServiceService) {
      this.email = localStorage.getItem('email');
   }

    ngOnInit() {
        this.getData();
  }
    getData() {
        this.api.get("/disabledExamDashboard/"+this.email).subscribe((res: any) => {
            this.examList = res;
        });
    }
}
