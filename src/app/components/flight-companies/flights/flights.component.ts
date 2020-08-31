import { FlightsService } from 'src/app/services/flights/flights.service';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/entities/flights/flight';
import { Router } from '@angular/router';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { Reservation } from 'src/app/entities/reservation';
import { ReservationFlight } from 'src/app/entities/reservationFlight';
import { ReservationService } from 'src/app/services/reservation-service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  @Input() flights: Flight[];


  constructor(public companyService: FlightCompaniesService,public serviceReservation:ReservationService, public service: FlightsService,public userService:ProfilePageService, private router: Router) {
  }

  book(): void {
    alert("Booked!");
  }

  ngOnInit(): void {
  }
  fastBook(flight:Flight){
    for (let i = 0 ; i < flight.seats.length-1;i++){
      for (let j = i+1 ; j < flight.seats.length;j++)
      {
        if (flight.seats[i].order > flight.seats[j].order){
          let temp = flight.seats[i]
          flight.seats[i] = flight.seats[j]
          flight.seats[j] = temp
        }
      }
    }

    for (let i = 0 ; i < 40 ;i++){
      if (flight.seats[i].type==0){
        let reservationFlight = new ReservationFlight()
        let reservation = new Reservation()
        reservation.flightID = flight.id
        reservation.userID = this.userService.loggedUser.id
        reservation.seats = new Array()
        flight.seats[i].type +=5
        reservation.seats.push(flight.seats[i])
        reservationFlight.users = new Array()

        reservation.price = flight.price + 50
        if (this.userService.loggedUser.points >=5){
          reservation.price = reservation.price - (reservation.price*0.2)
          this.userService.loggedUser.points -= 5
          reservationFlight.users.push(this.userService.loggedUser.id)
        }
        reservation.reservationType = 1
        reservation.numberOfPeople = 1
        reservation.bagCount = 1
        reservation.flightRating = 0
        reservationFlight.reservations = new Array()
        reservationFlight.reservations.push(reservation)
        reservationFlight.seats = reservation.seats

        this.serviceReservation.postFlightReservation(reservationFlight).subscribe(
          res=>{
            alert("Success.")
            this.router.navigateByUrl("/flightCompanies")
          }, 
          err=> {console.log(err);}
        );
        return
      }
    }  
    alert("No economy seats for quick book.") 
  }

}
