import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Flight } from 'src/app/entities/flights/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightRegisterService {
  formData: Flight;
  readonly rootURL = 'http://localhost:37240/api';
  list : Flight[];

  constructor(private http: HttpClient) { }

  postFlight() {
    return this.http.post(this.rootURL + '/Flights', this.formData);
  }
  putFlight() {
    return this.http.put(this.rootURL + '/Flights/'+ this.formData.companyId, this.formData);
  }
  deleteFlight(id) {
    return this.http.delete(this.rootURL + '/Flights/'+ this.formData.id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/Flights')
    .toPromise()
    .then(res => this.list = res as Flight[]);
  }
  
}

