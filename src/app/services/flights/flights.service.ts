import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from './flight-companies.service';
import { Flight } from './../../entities/flights/flight';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  formData: Flight;
  readonly rootURL = 'http://localhost:37240/api';
  flights : Flight[];
  company : FlightCompany;
  constructor(private http: HttpClient) {
      
   }

  loadFlights() {
    alert("asd");
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
    return this.http.delete(this.rootURL + '/Flights/'+ this.formData.id);
  }


}
