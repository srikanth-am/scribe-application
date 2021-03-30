import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
    url = '';
    constructor(private http: HttpClient) {
       this.url = environment.api_url;
    }
    //
    post(path: string, params?: any) {
        return this.http.post(this.url + path, params);
    };
    get(path: string) {
        return this.http.get(this.url + path);
    }
}
