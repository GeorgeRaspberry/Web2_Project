import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service';
import { Reservation } from 'src/app/entities/reservation';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { User } from 'src/app/entities/users/user';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {

  constructor(public service: ReservationService, private profileService:ProfilePageService) { }

  ngOnInit(): void {
    if (this.profileService.loggedUser.role != "")
    {
      this.service.reservations = new Array()
      this.service.loadReservations()
      if (localStorage.getItem('token')!= null)
      {
        this.profileService.refreshLogged(localStorage.getItem('token'));
      }
      else
      {
        this.profileService.loggedUser = new User()
      }
    }
  }

  cancelReservation(reservation:Reservation){
    this.service.cancelReservation(reservation.id).subscribe(
      res=>{
        this.service.reservations = new Array()
        this.service.loadReservations()
      }, 
      err=> {console.log(err);}
    );
  }
}
