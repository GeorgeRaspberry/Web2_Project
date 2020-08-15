import { NgForm } from '@angular/forms';
import { User } from 'src/app/entities/users/user';
import { ProfilePageComponent } from './../../components/login/profile-page/profile-page.component';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  formData: User;
  readonly rootURL = 'http://localhost:37240/api';
  list : User[];
  loggedUser:User = new User();
  constructor(private http: HttpClient) { }

  postUser() {
    return this.http.post(this.rootURL + '/User', this.formData);
  }
  putUser() {
    return this.http.put(this.rootURL + '/User/'+ this.formData.id, this.formData);
  }
  deleteUser(id) {
    return this.http.delete(this.rootURL + '/User/'+ this.formData.id);
  }
  getLoggedUser(token:string){
    this.http.get(this.rootURL + '/ApplicationUser/GetUserData/'+ token)
    .toPromise()
    .then(res => this.loggedUser = res as User);
  }


  login(form:NgForm) {
    return this.http.post(this.rootURL + '/ApplicationUser/Login', this.formData);
  }

  register (form:NgForm) {
      var body = {
      UserName: this.formData.userName,
      Email: this.formData.email,
      Name: this.formData.name,
      Lastname: this.formData.lastname,
      City: this.formData.city,
      PhoneNumber: this.formData.phoneNumber,
      Password: this.formData.password,
      Role: this.formData.role
      };
    return this.http.post(this.rootURL + '/ApplicationUser/Register', body);
  }

  refreshList(){
    this.http.get(this.rootURL + '/User')
    .toPromise()
    .then(res => this.list = res as User[]);
  }
}
