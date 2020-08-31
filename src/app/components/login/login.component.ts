import { ProfilePageService } from './../../services/users/profile-page.service';
import { UserRole } from 'src/app/entities/users/user-role.enum';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  formModel = {
    UserName: '',
    Password: ''
  }

  message: string = "send message";
  signUpOrIn: boolean = true;
  allUsers:Array<User>;
  verifiedPassword: string;

  registerUser(form: NgForm) {
    if (this.verifiedPassword == this.service.formData.password) {
      this.service.register(form.value).subscribe(
        (res: any) => {
          alert('Registration successful!');
        },
        err => {
          if (err.status == 400)
            alert('Incorrect username or password.');
          else
            console.log(err);
        }
      );
    }
    else {
      alert ("Password not verified!");
    }
  }

  constructor(public service: ProfilePageService, private router: Router) { }
  
  ngOnInit(): void {
    this.signUpOrIn = true;
    this.resetForm();
  }

  logIn(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.service.getLoggedUser(localStorage.getItem('token'));
        this.router.navigateByUrl('/flightCompanies');
      },
      err => {
        if (err.status == 400)
          alert('Incorrect password or username. Did you activate your account?');
        else
          console.log(err);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new User();
    this.service.formData.role = "Registered";
    this.verifiedPassword = "";
  }

  signUp()
  {
    this.resetForm();
    this.signUpOrIn = false;
  }

  signIn()
  {
    this.signUpOrIn = true;  
  }

}
