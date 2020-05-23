import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular web2-project';
  @ViewChild(LoginComponent) loginInfo;
  message:string;

  receiveMessage() {  
    alert("User logged in!");
  }

}
