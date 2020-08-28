import { DatePipe, Time } from '@angular/common';
import { FlightCompany } from './flight-company';
import { Location } from './location';
import { LocationTransfers } from './location-transfers';

export class Flight {
    id: number
    flyOffTime: Date;
    landingTime: Date;
    fullFlightTime: string;
    flightLength: number;
    numberOfTransfers: number;
    price: number;
    companyID: number
    company: FlightCompany;
    locationTransfers: Array<LocationTransfers>;


    constructor()
    {
    }

  
}
