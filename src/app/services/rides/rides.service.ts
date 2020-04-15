import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { Car } from './../../entities/rides/car';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideCompany } from 'src/app/entities/rides/ride-company';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  allCompanies: Array<RideCompany>;

  constructor(private flightCompanyService: RideCompaniesService) {
      this.allCompanies = flightCompanyService.loadCompanies();
   }

  loadFlights() {
    return this.mockedCars();
  }

  mockedCars(): Array<Car> {
    let allFlights = new Array<Car>();

    const r1 = new Car(1, this.allCompanies[0].name, 1, "Fiat", "Bravo" , "", 4, "hatchback");
    const r2 = new Car(2, this.allCompanies[0].name, 1, "Ford", "Focus" , "", 4, "hatchback");
    const r3 = new Car(3, this.allCompanies[0].name, 1, "Opel", "Corsa" , "", 4, "hatchback");
    const r4 = new Car(4, this.allCompanies[0].name, 1, "Dacia", "Duster 4x4", "", 4, "SUV");
    const r5 = new Car(5, this.allCompanies[0].name, 1, "Peugeot", "307", "", 4, "hatchback");
    const r6 = new Car(6, this.allCompanies[0].name, 1, "Mercedes", "e63",  "", 5, "caravan");
    const r7 = new Car(7, this.allCompanies[1].name, 2, "Volkswagen", "Golf", "", 4, "hatchback");
    const r8 = new Car(8, this.allCompanies[1].name, 2, "Seat", "Leon", "", 5, "hatchback");
    const r9 = new Car(9, this.allCompanies[1].name, 2, "Skoda", "Fabia", "", 4, "hatchback");
    const r10 = new Car(10, this.allCompanies[1].name, 2, "Audi", "A6", "", 5, "limousine");
    const r11 = new Car(11, this.allCompanies[1].name, 2, "Lamborghini", "Gallardo", "", 2, "sports-car");
    const r12 = new Car(12, this.allCompanies[1].name, 2, "Ferrari", "Testerossa", "", 2, "sports-car");

    allFlights.push(r1);
    allFlights.push(r2);
    allFlights.push(r3);
    allFlights.push(r4);
    allFlights.push(r5);
    allFlights.push(r6);
    allFlights.push(r7);
    allFlights.push(r8);
    allFlights.push(r9);
    allFlights.push(r10);
    allFlights.push(r11);
    allFlights.push(r12);

    return allFlights;
  }
}
