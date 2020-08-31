import { NgForm } from '@angular/forms';
import { User } from 'src/app/entities/users/user';
import { ProfilePageComponent } from './../../components/login/profile-page/profile-page.component';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgxMaterialTimepickerHoursFace } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-hours-face/ngx-material-timepicker-hours-face';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  formData: User;
  readonly rootURL = 'http://localhost:37240/api';
  loggedUser:User = new User()
  allUsers: Array<User>;
  constructor(private http: HttpClient) { }

  updateUserDetails() {
    return this.http.post(this.rootURL + '/ApplicationUser/UpdateUser/' + this.loggedUser.id, this.formData);
  }
  sendFriendRequest(potentialId: string) {
    return this.http.put(this.rootURL + '/ApplicationUser/SendRequest/'+ this.loggedUser.id + '/' + potentialId, null);
  }

  acceptFriendRequest(potentialId: string) {
    return this.http.put(this.rootURL + '/ApplicationUser/AcceptRequest/'+ this.loggedUser.id + '/' + potentialId, null);
  }

  rejectFriendRequest(potentialId: string) {
    return this.http.put(this.rootURL + '/ApplicationUser/RejectRequest/'+ this.loggedUser.id + '/' + potentialId, null);
  }

  removeFriend(potentialId: string) {
    return this.http.put(this.rootURL + '/ApplicationUser/RemoveFriend/'+ this.loggedUser.id + '/' + potentialId, null);
  }
  refreshLogged(token:string){
    this.http.get(this.rootURL + '/ApplicationUser/GetUserData/'+ token)
    .toPromise()
    .then(res =>{
      if (res == null){
        localStorage.removeItem('token')
      }
      else{
      this.loggedUser = res as User;
      var splitter = this.loggedUser.fullName.split(' ', 2);
      this.loggedUser.name = splitter[0];
      this.loggedUser.lastname = splitter[1];
      }
    })
  }

  getLoggedUser(token:string){
    this.http.get(this.rootURL + '/ApplicationUser/GetUserData/'+ token)
    .toPromise()
    .then(res =>{
      if (res == null){
        localStorage.removeItem('token')
      }
      else{
      this.loggedUser = res as User;
      var splitter = this.loggedUser.fullName.split(' ', 2);
      this.loggedUser.name = splitter[0];
      this.loggedUser.lastname = splitter[1];

      this.http.get(this.rootURL + '/ApplicationUser/GetAllFriends/'+ this.loggedUser.id)
      .toPromise()
      .then(res =>{
      if (res == null){
        localStorage.removeItem('token')
      }
      this.loggedUser.friendsList = res as Array<User>;
      this.loggedUser.friendsList.forEach(element => {
        element.status = 0
      });
      }
      );

      this.http.get(this.rootURL + '/ApplicationUser/GetAllUsers/'+ this.loggedUser.id)
      .toPromise()
      .then(res =>{
      if (res == null){
        localStorage.removeItem('token')
      }
      this.allUsers = res as Array<User>;
      }
      );
    }
    }
    );
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

  updateProfilePage() {
    this.getLoggedUser(localStorage.getItem('token'));
  }

  socialLogin(user: SocialUser) {
    return this.http.post(this.rootURL + '/ApplicationUser/SocialLogin', user).toPromise();
  }
}
