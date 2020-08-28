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
    this.service.formData.id = "";
    if (window.confirm('Are you sure?'))
    {
      this.service.postUser().subscribe(
        res=>{
          this.resetForm(form);
          this.service.refreshList();
        }, 
        err=> {console.log(err);}
    );
      alert("Saved!");
    }
    else
    {
      /*They clicked no. */
    }
  }

  constructor(public service: ProfilePageService) {
   
  }

  ngOnInit(): void {
    this.service.formData = this.service.loggedUser;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new User();
  }

}
