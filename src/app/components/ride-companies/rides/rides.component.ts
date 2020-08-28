import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/entities/rides/ride';
import { RidesService } from 'src/app/services/rides/rides.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  @Input()
  rides: Ride[];


constructor(public service:RidesService, private router:Router) {
  
}

book(): void {
  alert("Booked!");
}
updateRide(ride:Ride){
  console.log(ride)
  this.service.formData = ride
  this.router.navigateByUrl("ride/"+ride.companyID+"/register")
}

ngOnInit(): void {
}

}
