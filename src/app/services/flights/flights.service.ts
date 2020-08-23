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
  company : FlightCompany;
  transfers: Array<Location> = new Array();
  location: Location;

  constructor(private http: HttpClient) {
   }
  loadTransfers(){
    /*this.location = new Location();
    this.location.name = "New York";
    this.postLocation().subscribe(
      res=>{
      }, 
      err=> {console.log(err);}
    );
    this.location.name = "Novi Sad";
    this.postLocation().subscribe(
      res=>{
      }, 
      err=> {console.log(err);}
    );
    this.location.name = "Belgrade";
    this.postLocation().subscribe(
      res=>{
      }, 
      err=> {console.log(err);}
    );*/


    this.http.get(this.rootURL + '/Flights/GetLocations')
    .toPromise()
    .then(res =>  this.transfers = res as Array<Location>);
  }

  postLocation(){
    return this.http.post(this.rootURL + '/Flights/PostLocation', this.location);
  }

  loadFlights() {
    this.http.get(this.rootURL + '/Flights')
    .toPromise()
    .then(res => this.flights = res as Flight[]);
  }
  loadCompanyData(id:number)
  {
    this.http.get(this.rootURL + '/FlightCompanies/'+id)
    .toPromise()
    .then(res => this.company = res as FlightCompany);
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
