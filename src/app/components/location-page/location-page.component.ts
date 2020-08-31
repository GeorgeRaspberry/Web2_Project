import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { Location } from 'src/app/entities/flights/location';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {
  location:Location

  constructor(public service: FlightsService) { 
    this.service.loadTransfers()
    this.location = new Location()
  }

  ngOnInit(): void {
  }
  addLocation(){
    if (this.location.name == null || this.location.name == "" || this.location.address == null || this.location.address == ""){
      alert("Not all input filled")
    }
    this.service.postLocation(this.location).subscribe(
      res=>{
        this.location = new Location()
        this.service.loadTransfers()
      }, 
      err=> {console.log(err);}
    );
  }
  deleteLocation(location:Location){
    this.service.removeLocation(location).subscribe(
      res=>{
        this.location = new Location()
        this.service.loadTransfers()
      }, 
      err=> {console.log(err);}
    );
  }

}
