import { Injectable } from '@angular/core';
import { FlightCompany } from 'src/app/entities/flights/flight-company';

@Injectable({
  providedIn: 'root'
})
export class FlightCompaniesService {

  constructor() { }

  loadCompanies() {
    console.log('Učitavanje hotela...');
    return this.mockedCompanies();
  }

  mockedCompanies(): Array<FlightCompany> {
    let allFlightCompanies = new Array<FlightCompany>();

    const f1 = new FlightCompany(1,"assets/fclogo1.png", 'Emirates Palace', 'Abu Dhabi, United Arab Emirates', 'PROMO', 4.3);
    const f2 = new FlightCompany(2,"assets/fclogo2.png", 'Mardan Palace', 'Antalya, Turkey', 'PROMO', 2.4);
    const f3 = new FlightCompany(3,"assets/fclogo3.png", 'Burj Al Arab', 'Dubai, United Arab Emirates', 'PROMO', 4.9);
    const f4 = new FlightCompany(4,"assets/fclogo4.png", 'Atlantis Paradise', 'Paradise Island, Bahamas', 'PROMO', 3.6);

    allFlightCompanies.push(f1);
    allFlightCompanies.push(f2);
    allFlightCompanies.push(f3);
    allFlightCompanies.push(f4);

    return allFlightCompanies;
  }
}
