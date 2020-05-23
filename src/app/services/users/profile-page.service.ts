import { ProfilePageComponent } from './../../components/login/profile-page/profile-page.component';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  readonly rootURL = 'http://localhost:37240/api';

  constructor(private http: HttpClient) { }

  postProfile() {
    /*return this.http.post(this.rootURL + '/newFCompany', this.formData);*/
  }
  putProfile() {
    /*return this.http.put(this.rootURL + '/newFCompany/'+ this.formData.id, this.formData);*/
  }
  deleteProfile(id) {
    /*return this.http.delete(this.rootURL + '/newFCompany/'+ this.formData.id);*/
  }

  refreshList(){
    /*this.http.get(this.rootURL + '/Flights')
    .toPromise()
    .then(res => this.list = res as FlightCompany[]);*/
  }
}
