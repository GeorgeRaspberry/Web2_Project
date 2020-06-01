import { Flight } from './flight';

export class FlightCompany {
    id: number;
    name: string;
    image: string;
    address: string;
    promoDescription: string;
    rating: number;
    flights: Array<Flight>;

    constructor(id: number, image:string, name: string, address: string, promoDescription: string, rating: number)
    {
        this.id = id;
        this.image = image;
        this.name = name;
        this.address = address;
        this.promoDescription = promoDescription;
        this.rating = rating;
        this.flights = new Array<Flight>();
    }
}
