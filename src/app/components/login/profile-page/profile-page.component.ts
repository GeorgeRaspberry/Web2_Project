import { UserRole } from 'src/app/entities/users/user-role.enum';
import { ProfilePageService } from './../../../services/users/profile-page.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/entities/users/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  saveChanges(form: NgForm) {
    if (window.confirm('Are you sure?'))
    {
      if (this.service.formData.name === '' || this.service.formData.lastname === '' || this.service.formData.userName === ''
      || this.service.formData.password === '' || this.service.formData.email === '') {
        alert("There are empty fields!");
      }
      else {
        this.service.updateUserDetails().subscribe(
          res=>{
            this.service.updateProfilePage();
          }, 
          err=> {console.log(err);}
      );
        alert("Saved!");
      }
    }
    else
    {
      /*They clicked no. */
    }
  }

  constructor(public service: ProfilePageService) {
   
  }

  ngOnInit(): void {
    console.log(this.service.loggedUser)
    this.service.formData = this.service.loggedUser;
    this.service.updateProfilePage();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new User();
  }

  sendRequest(potentialId: string) {
    this.service.sendFriendRequest(potentialId).subscribe(
      res=>{
        this.service.getLoggedUser(localStorage.getItem('token'));
      }, 
      err=> {console.log(err);}
  );
    alert("Sent!");
  }

  acceptRequest(potentialId: string) {
    this.service.acceptFriendRequest(potentialId).subscribe(
      res=>{
        this.service.getLoggedUser(localStorage.getItem('token'));
      }, 
      err=> {console.log(err);}
  );
    alert("Accepted!");
  }

  rejectRequest(potentialId: string) {
    this.service.rejectFriendRequest(potentialId).subscribe(
      res=>{
        this.service.getLoggedUser(localStorage.getItem('token'));
      }, 
      err=> {console.log(err);}
  );
    alert("Rejected!");
  }

  removeFriend(potentialId: string) {
    this.service.removeFriend(potentialId).subscribe(
      res=>{
        this.service.getLoggedUser(localStorage.getItem('token'));
      }, 
      err=> {console.log(err);}
  );
    alert("Removed!");
  }
}
