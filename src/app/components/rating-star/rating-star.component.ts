import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent implements OnInit {

  @Input() rating:number;
  @Input() id:number;
  @Input() rateOrShow:number;
  @Input() flightOrRide:number;
  constructor(public service:ReservationService,private profileService:ProfilePageService) { }

  ngOnInit(): void {
  }


  rate(rating:number){ 
    if (this.flightOrRide == 0){
      this.service.rateFlightReservation(this.id,rating).subscribe(
        res=>{  
          this.rateOrShow = 1
          this.rating = rating
          this.service.loadReservations()
        },  
        err=> {console.log(err);}
      );
    }else{
      this.service.rateRideReservation(this.id,rating).subscribe(
        res=>{  
          this.rateOrShow = 1
          this.rating = rating
          this.service.loadReservations()
        },  
        err=> {console.log(err);}
      );
    }
   
  }
}
