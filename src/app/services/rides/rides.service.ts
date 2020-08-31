import { Ride } from '../../entities/rides/ride';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/entities/flights/location';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  formData: Ride;
  readonly rootURL = 'http://localhost:37240/api';
  rides : Ride[];
  ride : Ride;
  sortParametar: string;
  filterRideName: string;
  transfers: Array<Location> = new Array();

  constructor(private http: HttpClient) {}

  loadTransfers(){
    this.http.get(this.rootURL + '/Flights/GetLocations')
    .toPromise()
    .then(res =>  this.transfers = res as Array<Location>);
  }

  postLocation(location:Location){
    return this.http.post(this.rootURL + '/Flights/PostLocation', location);
  }

  loadRidesOnLocation(location:string) {
    this.http.get(this.rootURL + '/Rides/LoadRidesLocation/'+location)
    .toPromise()
    .then(res => {
      this.rides = res as Ride[]
    });
  }

  loadRide(id:number)
  {
    this.http.get(this.rootURL + '/Rides/'+id)
    .toPromise()
    .then(res =>{
      this.ride = res as Ride
      this.rides = new Array()
      this.rides.push(this.ride)
    }
    );
  }
  loadRides()
  {
    this.http.get(this.rootURL + '/Rides')
    .toPromise()
    .then(res =>{
      this.rides = res as Array<Ride>
    }
    );
  }
  
  postRide() {
    return this.http.post(this.rootURL + '/Rides', this.formData);
  }
  putRide() {
    return this.http.put(this.rootURL + '/Rides/'+this.formData.id, this.formData);
  }
  deleteRide(id) {
    return this.http.delete(this.rootURL + '/Rides/'+ this.formData.id);
  }
}
