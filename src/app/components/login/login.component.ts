import { ProfilePageService } from './../../services/users/profile-page.service';
import { UserRole } from 'src/app/entities/users/user-role.enum';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/users/user';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";

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
  readonly rootURL = 'http://localhost:37240/api';

  registerUser(form: NgForm) {
    if (this.verifiedPassword === this.service.formData.password) {
      if (this.service.formData.name === undefined || this.service.formData.lastname === undefined || this.service.formData.userName === undefined
      || this.service.formData.password === undefined || this.service.formData.email === undefined) {
        alert("There are empty fields!");
      }
      else {
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
    }
    else {
      alert ("Password not verified!");
    }
  }

  constructor(public service: ProfilePageService, private router: Router, private http: HttpClient, private authService: SocialAuthService) { }
  
  ngOnInit(): void {
    this.signUpOrIn = true;
    this.resetForm();
    if (localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/flightCompanies');
    }
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
  
  loginWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(user => {
        this.service.socialLogin(user).then((res: any) => {
          localStorage.setItem("token", res.token);
          alert('Login successful! Please go to your profile to change information.');
          this.service.getLoggedUser(localStorage.getItem('token'));
          this.router.navigateByUrl('/flightCompanies');
        })
      })
  }

}
