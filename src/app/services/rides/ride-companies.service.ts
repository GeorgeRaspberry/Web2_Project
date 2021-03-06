import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { Location } from 'src/app/entities/flights/location';
import { Ride } from 'src/app/entities/rides/ride';

@Injectable({
  providedIn: 'root'
})
export class RideCompaniesService {

  formData: RideCompany;
  readonly rootURL = 'http://localhost:37240/api';
  sortParametar: string;
  filterCompanyName: string;
  companies : Array<RideCompany>;
  company:RideCompany = new RideCompany()
  transfers: Array<Location>
  ride: Ride = new Ride()
  constructor(private http: HttpClient) { }

  loadTransfers(){
    this.http.get(this.rootURL + '/Flights/GetLocations')
    .toPromise()
    .then(res =>  this.transfers = res as Array<Location>);
  }

  loadRidesOnLocation(location:string) {
    this.company = new RideCompany()
    this.http.get(this.rootURL + '/Rides/LoadRidesLocation/'+location)
    .toPromise()
    .then(res => {
      this.company = new RideCompany()
      this.company.rides = res as Ride[]
    });
  }

  loadRide(id:number)
  {
    this.company = new RideCompany()

    this.http.get(this.rootURL + '/Rides/'+id+"/"+id)
    .toPromise()
    .then(res =>{
      this.ride = res as Ride
      this.company.rides = new Array()
      this.company.rides.push(this.ride)
    }
    );
  }

  postLocation(location:Location){
    return this.http.post(this.rootURL + '/Flights/PostLocation', location);
  }

  loadCompanies() {
    this.company =new RideCompany()
    this.http.get(this.rootURL + '/RideCompanies')
    .toPromise()
    .then(res =>  this.companies = res as Array<RideCompany>);
  }

  loadCompanyData(id:number) {
    this.http.get(this.rootURL + '/RideCompanies/'+id)
    .toPromise()
    .then(res => {
      this.company = res as RideCompany
    });
  }

  postRideCompany() {
    return this.http.post(this.rootURL + '/RideCompanies', this.formData);
  }
  putRideCompany() {
    return this.http.put(this.rootURL + '/RideCompanies/'+ this.formData.id, this.formData);
  }
  deleteRideCompany(id) {
    return this.http.delete(this.rootURL + '/RideCompanies/'+ id);
  }
}
