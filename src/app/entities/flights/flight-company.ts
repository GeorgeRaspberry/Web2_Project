import { Flight } from './flight';

export class FlightCompany {
    id: number;
    name: string;
    image: string;
    address: string;
    promoDescription: string;
    rating: number;
    flights: Array<Flight>;
    userID:string
    constructor()
    {
    }
}
