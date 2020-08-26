import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { Flight } from './../../entities/flights/flight';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/entities/flights/location';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  formData: Flight;
  readonly rootURL = 'http://localhost:37240/api';
  flights : Flight[];
  flight : Flight;
  transfers: Array<Location> = new Array();

  constructor(private http: HttpClient) {
   }
  loadTransfers(){
    this.http.get(this.rootURL + '/Flights/GetLocations')
    .toPromise()
    .then(res =>  this.transfers = res as Array<Location>);
  }

  postLocation(location:Location){
    return this.http.post(this.rootURL + '/Flights/PostLocation', location);
  }

  loadFlights() {
    this.http.get(this.rootURL + '/Flights')
    .toPromise()
    .then(res => this.flights = res as Flight[]);
  }

  loadFlight(id:number)
  {
    this.http.get(this.rootURL + '/Flights/'+id)
    .toPromise()
    .then(res => this.flight = res as Flight);
  }

  
  postFlight() {
    return this.http.post(this.rootURL + '/Flights', this.formData);
  }
  putFlight() {
    return this.http.put(this.rootURL + '/Flights/'+ this.formData.companyId, this.formData);
  }
  deleteFlight(id) {
    alert("delete")
    return this.http.delete(this.rootURL + '/Flights/'+ this.formData.id);
  }


}
