//simport { map } from 'rxjs/operators';
import { ApiServiceService } from './../../services/api/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private api:ApiServiceService, private router: Router) { }
    user: any = {};
    ngOnInit() {
        this.user = {
            loader: false,
            data: {
                username: '',
                password: '',
            }
        }
    }
    login():void {
        this.user.loader = true;
        let token = '';
        this.api.post("/auth", this.user.data).subscribe((res: any) => {
            this.user.loader = false;
            if (res.access_token != undefined) {
                localStorage.setItem('token', res.access_token);
                localStorage.setItem('email', this.user.data.username);
                this.api.get("/examDashboard/"+this.user.data.username).subscribe((role: any) => {
                    if (role == "volunteer") {
                       this.router.navigate(['/scribe-volunteer']);
                    } else {
                        this.router.navigate(['/scribe-seeker']);
                    }
                });
               
            } else {
                alert("Invalid Credentials");
            }
        });
        
        this.user.loader = false;
    }

}
