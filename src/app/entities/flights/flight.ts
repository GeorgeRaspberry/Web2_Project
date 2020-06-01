import { DatePipe, Time } from '@angular/common';
import { FlightCompany } from './flight-company';

export class Flight {
    id: number
    company: FlightCompany;
    companyId: number
    flyOffTime: Date;
    landingTime: Date;
    fullFlightTime: string;
    flightLength: number;
    numberOfTransfers: number;
    locationOfTransfers: string;
    price: number;

    constructor(Id: number, companyid: number, flyofftime: string, landingtime: string, fullflighttime: string, flightlength: number, transfernum: number, transferlocations: string, price: number)
    {
       
    }

  
}
