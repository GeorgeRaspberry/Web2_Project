import { FlightCompany } from './../../entities/flights/flight-company';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FcompanyRegisterService {

  formData: FlightCompany;
  readonly rootURL = 'http://localhost:37240/api';
  list : FlightCompany[];

  constructor(private http: HttpClient) { }

  postFlight() {
    return this.http.post(this.rootURL + '/newFCompany', this.formData);
  }
  putFlight() {
    return this.http.put(this.rootURL + '/newFCompany/'+ this.formData.id, this.formData);
  }
  deleteFlight(id) {
    return this.http.delete(this.rootURL + '/newFCompany/'+ this.formData.id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/Flights')
    .toPromise()
    .then(res => this.list = res as FlightCompany[]);
  }

}
