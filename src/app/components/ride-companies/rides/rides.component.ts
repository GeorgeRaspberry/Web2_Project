import { FlightCompany } from './../../../entities/flights/flight-company';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/entities/rides/ride';
import { RidesService } from 'src/app/services/rides/rides.service';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation-service';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  @Input()
  rides: Ride[];
  @Input()
  quickRent: number;


constructor(public userService:ProfilePageService,public service:RidesService,public ridesService:RideCompaniesService, private router:Router, public serviceReservation: ReservationService) {
}
book(car:Ride): void {
  this.router.navigateByUrl("ride/"+car.id+"/book")
}
updateRide(ride:Ride){
  this.service.formData = ride
  this.router.navigateByUrl("ride/"+ride.companyID+"/register")
}

ngOnInit(): void {
  if (this.quickRent == 1 || this.quickRent == 2){
    this.ridesService.company = new RideCompany()
    this.ridesService.company.rides = this.rides
    alert(this.rides)
  }

}
bookQuick(car:Ride){
  if (this.serviceReservation.formData.rideRentDays == null || this.serviceReservation.formData.rideRentDays < 5){
    alert("Rent should last at leats 5 days.")
    return
  }
  this.serviceReservation.formData.rideID = car.id
  this.serviceReservation.formData.statusRide = 0
  this.serviceReservation.formData.reservationType = 2
  this.serviceReservation.formData.price = car.price
  alert("Car chosen.")
  }
}
