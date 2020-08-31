import { Injectable } from '@angular/core';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/entities/flights/location';

@Injectable({
  providedIn: 'root'
})
export class FlightCompaniesService {
  formData: FlightCompany;
  readonly rootURL = 'http://localhost:37240/api';
  companies : Array<FlightCompany>;
  company:FlightCompany = new FlightCompany()

  constructor(private http: HttpClient) { }


  loadCompanies() {
    this.company =new FlightCompany()
    this.http.get(this.rootURL + '/FlightCompanies')
    .toPromise()
    .then(res =>  this.companies = res as Array<FlightCompany>);
  }
  loadCompanyData(id:number)
  {
    this.http.get(this.rootURL + '/FlightCompanies/'+id)
    .toPromise()
    .then(res => {
      this.company = res as FlightCompany
      console.log(this.company)
    });
  }


  postFlightCompany() {
    return this.http.post(this.rootURL + '/FlightCompanies', this.formData);
  }
  putFlight() {
    return this.http.put(this.rootURL + '/FlightCompanies/'+ this.formData.id, this.formData);
  }
  deleteFlightCompany(id) {
    return this.http.delete(this.rootURL + '/FlightCompanies/'+ id);
  }




}
