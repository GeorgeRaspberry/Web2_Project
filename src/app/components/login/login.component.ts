import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/entities/users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "send message";
  signUpOrIn:boolean = true;
  allUsers:Array<User>;
  constructor(private userService: UserService) {
      this.allUsers = this.userService.loadUsers();
   }
  
  ngOnInit(): void {
    this.signUpOrIn = true;
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
