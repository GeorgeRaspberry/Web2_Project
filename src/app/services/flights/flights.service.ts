import { dateCluster } from './../../entities/flights/dateCluster';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { Flight } from './../../entities/flights/flight';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/entities/flights/location';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  formData: Flight;
  readonly rootURL = 'http://localhost:37240/api';
  flights : Flight[];
  flight : Flight;
  transfers: Array<Location> = new Array();
  sortParametar: string;

  constructor(private http: HttpClient, private router: Router, public flightCompanyService: FlightCompaniesService) {
   }
  loadTransfers(){
    this.http.get(this.rootURL + '/Flights/GetLocations')
    .toPromise()
    .then(res =>  this.transfers = res as Array<Location>);
  }

  postLocation(location:Location){
    return this.http.post(this.rootURL + '/Flights/PostLocation', location);
  }

  removeLocation(location:Location){
    return this.http.delete(this.rootURL + '/Flights/DeleteLocation/'+ location.id);
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
    .then(res =>{

     this.formData = res as Flight
     
      for (let i = 0 ; i < this.formData.seats.length-1;i++){
        for (let j = i+1 ; j < this.formData.seats.length;j++)
        {
          if (this.formData.seats[i].order > this.formData.seats[j].order){
            let temp = this.formData.seats[i]
            this.formData.seats[i] = this.formData.seats[j]
            this.formData.seats[j] = temp
          }
        }
      }

    }
    );
  }

  postFlight() {
    return this.http.post(this.rootURL + '/Flights', this.formData);
  }
  putFlight() {
    return this.http.put(this.rootURL + '/Flights/'+ this.formData.companyID, this.formData);
  }
  deleteFlight(id) {
    return this.http.delete(this.rootURL + '/Flights/'+ this.formData.id);
  }

  filterDates(id: number, date1: Date, date2: Date) {
    var tempDate = new dateCluster(this.flightCompanyService.company.id, date1, date2);
    this.http.post(this.rootURL + '/Flights/FilterDates', tempDate).subscribe(
      (res: any) => {
        console.log(res);
        this.flightCompanyService.company.flights = res as Array<Flight>;
      },
      err => {
          console.log(err);
      }
    )
  }
}
