import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ProfilePageService } from './services/users/profile-page.service';
import { User } from './entities/users/user';
import { ReservationService } from './services/reservation-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular web2-project';
  @ViewChild(LoginComponent) loginInfo;
  message:string;

  constructor(public service:ProfilePageService, public serviceReservation:ReservationService) { }

  receiveMessage() {  
    alert("User logged in!");
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')!= null)
    {
      this.serviceReservation.loadReservations()
      this.service.getLoggedUser(localStorage.getItem('token'));
    }
    else
    {
      this.service.loggedUser = new User()
    }
  }

}
