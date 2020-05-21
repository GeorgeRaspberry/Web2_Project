import { DatePipe, Time } from '@angular/common';

export class Flight {
    id: number
    company: string;
    companyId: number
    flyOffTime: Date;
    landingTime: Date;
    fullFlightTime: string;
    flightLength: number;
    numberOfTransfers: number;
    locationOfTransfers: Array<string>;
    price: number;

    constructor(Id: number, company: string, companyid: number, flyofftime: string, landingtime: string, fullflighttime: string, flightlength: number, transfernum: number, transferlocations: Array<string>, price: number)
    {
        this.id = Id;
        this.company = company;
        this.companyId = companyid
        this.flyOffTime = new Date(); //placeholder
        this.landingTime = new Date(); //placeholder
        this.fullFlightTime = fullflighttime;
        this.flightLength = flightlength;
        this.numberOfTransfers = transfernum;
        this.locationOfTransfers = transferlocations;
        this.price = price;
    }

    CreateTest(Id: number, Name: string) {
        this.id = Id;
        this.company = Name;
    }
}
