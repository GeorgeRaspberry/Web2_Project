import { FlightCompany } from './flight-company';
import { LocationTransfers } from './location-transfers';
import { Seat } from './seat';

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
    seats: Array<Seat>

    constructor()
    {
        this.seats = new Array()
        for (let i = 0 ; i < 40;i++){
            this.seats.push(new Seat(i))
        }
    }

  
}
