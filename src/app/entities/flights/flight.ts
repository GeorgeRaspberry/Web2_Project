import { DatePipe, Time } from '@angular/common';
import { FlightCompany } from './flight-company';
import { Location } from './location';

export class Flight {
    id: number
    fullFlightTime: string;
    flightLength: number;
    flyOffTime: Date;
    landingTime: Date;
    companyId: number
    numberOfTransfers: number;
    locationTransfers: Array<Location>;
    price: number;
    company: FlightCompany;
    

    constructor()
    {
    }

  
}
