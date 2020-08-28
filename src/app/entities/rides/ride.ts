import { DatePipe, Time } from '@angular/common';
import { FlightCompany } from '../flights/flight-company';
import { RideCompany } from './ride-company';
import { Location } from '../flights/location';

export class Ride {
    id: number
    company: RideCompany;
    companyID: number
    carMaker: string;
    carModel: string;
    productionYear: string;
    numberOfSeats: number;
    carType: string;
    locationID:number
    location:Location

    constructor() {

    }
}
