import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/entities/reservation';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { User } from 'src/app/entities/users/user';
import { ReservationFlight } from 'src/app/entities/reservationFlight';
import { Seat } from 'src/app/entities/flights/seat';
import { Flight } from 'src/app/entities/flights/flight';
import { RidesService } from 'src/app/services/rides/rides.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  step:number
  id:number
  constructor(public rideService:RidesService,public service: FlightsService,public serviceReservation: ReservationService, public profileService:ProfilePageService, public route: ActivatedRoute, private router:Router) { 
    this.service.formData = new Flight()
    this.resetForm()
    this.route.params.subscribe(params => { this.id = Number(params['id']); });
    this.service.loadFlight(this.id)
    this.step =0
  }

  ngOnInit(): void {
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.serviceReservation.formData = new Reservation();
  }

  chooseFriends(){
    if (this.serviceReservation.formData.bagCount == null || this.serviceReservation.formData.numberOfPeople<=0 || this.serviceReservation.formData.numberOfPeople == null){
      alert("Not all inputs are filled correctly")
      return
    }
    this.profileService.loggedUser.friendsList = new Array()
    this.profileService.getLoggedUser(localStorage.getItem('token'));

    this.serviceReservation.picked = this.serviceReservation.formData.numberOfPeople-1
    this.step = 1
  }
  inviteUser(index:string){
    if (this.serviceReservation.picked == 0)
    {
      alert("Can't pick more.")
      return
    }
    this.serviceReservation.picked--
    this.profileService.loggedUser.friendsList[index].status =1
  }
  unInviteUser(index:string){
    this.serviceReservation.picked++
    this.profileService.loggedUser.friendsList[index].status =0
  }

  chooseSeats(){
    let numberOfPeople = this.serviceReservation.picked + 1
    this.serviceReservation.picked = this.serviceReservation.formData.numberOfPeople
    this.serviceReservation.formData.numberOfPeople = numberOfPeople
    this.step = 2
  }
  makeReservation(form:NgForm){
    if (this.serviceReservation.picked != 0){
      alert("Need to select all seats.")
      return
    }
    let carPrice = this.serviceReservation.formData.price
    this.serviceReservation.formData.price = 0

    let seats = new Array<Seat>()
    this.service.formData.seats.forEach(element => {
        if (element.type >4){
          seats.push(element)
        }
    });
    let reservations = new Array<Reservation>()

    let seatNumber = 0
    let users = new Array<User>()
    this.profileService.loggedUser.friendsList.forEach(element => {
      if (element.status == 1){
        let reservation = new Reservation()
        reservation.userID = element.id
        reservation.flightID = this.id
        reservation.bagCount = 0
        reservation.numberOfPeople = 1
        reservation.reservationType = 3
        reservation.seats = new Array()
        reservation.seats.push(seats[seatNumber])
        reservation.price = this.service.formData.price + ( this.service.formData.price * ( (seats[seatNumber].type-5)*0.20 ) )
        seatNumber++
        if (element.points >=5){
          reservation.price = reservation.price - (reservation.price*0.2)
          element.points = element.points - 5
        }
        users.push(element)

        reservations.push(reservation)
      }
    });

    this.serviceReservation.formData.flightID= this.id
    this.serviceReservation.formData.userID = this.profileService.loggedUser.id
    let price = 0 
    this.serviceReservation.formData.seats = new Array()
    for (let i = 0 ; i < this.serviceReservation.formData.numberOfPeople ; i++){
      price = price + ((     this.service.formData.price + 
        ( this.service.formData.price * ( (seats[seatNumber].type-5)*0.20 ) ) ))

      this.serviceReservation.formData.seats.push(seats[seatNumber])
      seatNumber++
    }


    this.serviceReservation.formData.price =  price +  (this.serviceReservation.formData.bagCount*50)
    
    if (this.serviceReservation.formData.reservationType == 2){
      this.serviceReservation.formData.rentRideStart = this.service.formData.landingTime
      this.serviceReservation.formData.price = this.serviceReservation.formData.price + (this.serviceReservation.formData.rideRentDays * carPrice)
    }
    else{
      this.serviceReservation.formData.reservationType = 1
    }


    if(this.profileService.loggedUser.points >= 5){
      this.serviceReservation.formData.price = this.serviceReservation.formData.price - (this.serviceReservation.formData.price*0.2)
      this.profileService.loggedUser.points = this.profileService.loggedUser.points - 5
    }
    users.push(this.profileService.loggedUser)

    
    reservations.push(this.serviceReservation.formData)



    let reservationFlight = new ReservationFlight()
    reservationFlight.reservations = reservations
    reservationFlight.seats = seats
    reservationFlight.users = users
    this.serviceReservation.postFlightReservation(reservationFlight).subscribe(
      res=>{
        this.resetForm(form);
        this.router.navigateByUrl("/flightCompanies")
      }, 
      err=> {console.log(err);}
    );

  }
  rentACar(){

    this.rideService.loadRidesOnLocation(this.service.formData.locationTransfers[this.service.formData.locationTransfers.length-1].location.name)


    this.step = 3
  }

}
