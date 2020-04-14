import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from './flight-companies.service';
import { Flight } from './../../entities/flights/flight';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  allCompanies: Array<FlightCompany>;

  constructor(private flightCompanyService: FlightCompaniesService) {
      this.allCompanies = flightCompanyService.loadCompanies();
   }

  loadFlights() {
    return this.mockedFlights();
  }

  mockedFlights(): Array<Flight> {
    let allFlights = new Array<Flight>();

    const f1 = new Flight(1, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "39:28", 2500, 2, ["","",""], 101);
    const f2 = new Flight(2, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "49:28", 4500, 1, ["","",""], 181);
    const f3 = new Flight(3, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "19:12", 500, 0, ["","",""], 51);
    const f4 = new Flight(4, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "39:28", 2500, 2, ["","",""], 101);
    const f5 = new Flight(5, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "49:28", 4500, 1, ["","",""], 181);
    const f6 = new Flight(6, this.allCompanies[0].name, 1, "yyyy-dd-MM", "yyyy-dd-MM", "19:12", 500, 0, ["","",""], 51);
    const f7 = new Flight(7, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "39:28", 2500, 2, ["","",""], 102);
    const f8 = new Flight(8, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "49:28", 4500, 1, ["","",""], 182);
    const f9 = new Flight(9, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "19:12", 500, 0, ["","",""], 52);
    const f10 = new Flight(10, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "39:28", 2500, 2, ["","",""], 102);
    const f11 = new Flight(11, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "49:28", 4500, 1, ["","",""], 182);
    const f12 = new Flight(12, this.allCompanies[1].name, 2, "yyyy-dd-MM", "yyyy-dd-MM", "19:12", 500, 0, ["","",""], 52);
    

    allFlights.push(f1);
    allFlights.push(f2);
    allFlights.push(f3);
    allFlights.push(f4);
    allFlights.push(f5);
    allFlights.push(f6);
    allFlights.push(f7);
    allFlights.push(f8);
    allFlights.push(f9);
    allFlights.push(f10);
    allFlights.push(f11);
    allFlights.push(f12);

    return allFlights;
  }
}
