import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service';
import { RidesService } from 'src/app/services/rides/rides.service';
import { Ride } from 'src/app/entities/rides/ride';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/entities/reservation';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-ride-reservation',
  templateUrl: './ride-reservation.component.html',
  styleUrls: ['./ride-reservation.component.css']
})
export class RideReservationComponent implements OnInit {

  id: number;
  constructor(private route: ActivatedRoute, public service: ReservationService,public rideService:RidesService,public profileService:ProfilePageService, private router:Router) {
  }

  ngOnInit(): void {
    this.resetForm()
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.rideService.loadRide(this.id)
  }

  book(form:NgForm){
    if (this.service.formData.rentRideStart == null){
      alert("Not all inputs are entered.")
    }
    if (this.service.formData.rideRentDays == null || this.service.formData.rideRentDays < 5){
      alert("Rent should last at leats 5 days.")
      return
    }

    let currentDate = new Date()
    let daysAhead=new Date()
    daysAhead.setDate(daysAhead.getDate() + 31)

    if (this.service.formData.rentRideStart < currentDate){
      alert("Date needs to be ahead of current date.")
      return
    }
    if (this.service.formData.rentRideStart > daysAhead ){
      alert("Rent must be maximum 31 days ahead")
      return
    }


    this.service.formData.rideID = this.rideService.ride.id
    this.service.formData.userID = this.profileService.loggedUser.id
    this.service.formData.statusRide = 0
    this.service.formData.reservationType = 0
    this.service.formData.price = this.service.formData.rideRentDays * this.rideService.ride.price
    this.service.postRideReservation().subscribe(
      res=>{
        this.resetForm(form);
        this.router.navigateByUrl("/rideCompanies")
      }, 
      err=> {console.log(err);}
    );
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new Reservation();
  }
}
