import { ProfilePageService } from './../../services/users/profile-page.service';
import { UserRole } from 'src/app/entities/users/user-role.enum';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  message: string = "send message";
  signUpOrIn: boolean = true;
  allUsers:Array<User>;
  verifiedPassword: string;

  registerUser(form: NgForm) {
    if (this.verifiedPassword == this.service.formData.password) {

      this.service.formData.id = 0;
      this.service.formData.image = "?";
      
      this.service.postUser().subscribe(
        res=>{
          this.resetForm(form);
          this.service.refreshList();
        }, 
        err=> {console.log(err);}
      );
    }
    else {
      alert ("Password not verified!");
    }
  }

  constructor(public service: ProfilePageService, private router: Router, private userService: UserService) { }
  
  ngOnInit(): void {
    this.signUpOrIn = true;
    this.resetForm();
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/flightCompanies');
  }

  logIn(form:NgForm) {
    this.service.login().subscribe(
      (res: any) => {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigateByUrl('/flightCompanies');
      },
      err => {
        if (err.status == 400)
          alert('Incorrect username or password.');
        else
          console.log(err);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new User("","","","","","","","", UserRole.Registered);
    this.verifiedPassword = "";
  }

  signUp()
  {
    this.signUpOrIn = false;
  }

  signIn()
  {
    this.signUpOrIn = true;  
  }

  checKLoginInfo() {
    let username = (<HTMLInputElement> document.getElementById("username")).value;
    let password = (<HTMLInputElement> document.getElementById("password")).value;
    let temp = false;
    for(let user of this.allUsers)
    {
      if (user.username == username && user.password == password)
      {
        this.userService.loggedInUser = user;
        temp = true;
      }
    }
    if (temp == true)
    {
      this.messageEvent.emit();
    }
    else
    {
      alert("No user with that combination.");
    }
  }
}
