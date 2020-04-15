import { Injectable } from '@angular/core';
import { RideCompany } from 'src/app/entities/rides/ride-company';

@Injectable({
  providedIn: 'root'
})
export class RideCompaniesService {

  constructor() { }

  loadCompanies() {
    console.log('Učitavanje kompanija...');
    return this.mockedCompanies();
  }

  mockedCompanies(): Array<RideCompany> {
    let allRideCompanies = new Array<RideCompany>();

    const r1 = new RideCompany(1,"assets/rentcar1.png", 'Rentorius Carius', "Addis Ababa	, Ethiopia" , 'Drive like a real man!', 4.3);
    const r2 = new RideCompany(2,"assets/rentcar2.png", 'KarzEkspress', 'Paris, France', 'We grant what you wish for!', 4.4);
    const r3 = new RideCompany(3,"assets/rentcar3.png", 'ForCar', 'Novi Sad, Serbia', 'We all for ti!', 0.2);
    const r4 = new RideCompany(4,"assets/rentcar4.png", 'Smart Car', 'Vienna, Austria', 'Go fast or go home!', 3.6);
    const r5 = new RideCompany(5,"assets/rentcar5.png", 'Cole Rental', "California, USA" , 'We are good!', 5.0);

    allRideCompanies.push(r1);
    allRideCompanies.push(r2);
    allRideCompanies.push(r3);
    allRideCompanies.push(r4);
    allRideCompanies.push(r5);
    
    return allRideCompanies;
  }
}
