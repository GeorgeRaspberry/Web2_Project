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

    const f1 = new FlightCompany(1,"assets/fclogo1.png", 'Australian Airlines', "Brisbane, Australia" , 'Jump from city to city, like a kangaroo!', 4.3);
    const f2 = new FlightCompany(2,"assets/fclogo2.png", 'Turkish Airlines', 'Antalya, Turkey', 'We serve shishkebab during flights!', 4.4);
    const f3 = new FlightCompany(3,"assets/fclogo3.png", 'AirSerbia', 'Belgrade, Serbia', 'Bolje nemojte sa nama...', 0.9);
    const f4 = new FlightCompany(4,"assets/fclogo4.png", 'Austrian Airlines', 'Vienna, Austria', 'Wir sind sehr gut, ja!', 3.6);
    const f5 = new FlightCompany(5,"assets/fclogo5.png", 'Amerian Airlines', "New York, USA" , 'We fly so much we forgot how the ground feels like!', 4.3);
    const f6 = new FlightCompany(6,"assets/fclogo6.png", 'Alaska Airways', 'Kansas City, USA', "Don't worry, we have heated seats!", 4.8);
    const f7 = new FlightCompany(7,"assets/fclogo7.png", 'South African Airways', 'Capetown, SAR', "Don't worry, we have air condition!", 3.9);
    const f8 = new FlightCompany(8,"assets/fclogo8.png", 'Fly Emirates', 'Dubai, United Arab Emirates', 'We pay you to fly with us!', 4.6);

    allFlightCompanies.push(f1);
    allFlightCompanies.push(f2);
    allFlightCompanies.push(f3);
    allFlightCompanies.push(f4);
    allFlightCompanies.push(f5);
    allFlightCompanies.push(f6);
    allFlightCompanies.push(f7);
    allFlightCompanies.push(f8);

    return allFlightCompanies;
  }
}
