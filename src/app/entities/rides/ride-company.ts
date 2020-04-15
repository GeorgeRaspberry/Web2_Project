import { Car } from './car';

export class RideCompany {
    id: number;
    name: string;
    image: string;
    address: string;
    promoDescription: string;
    rating: number;
    cars: Array<Car>;

    constructor(id: number, image:string, name: string, address: string, promoDescription: string, rating: number)
    {
        this.id = id;
        this.image = image;
        this.name = name;
        this.address = address;
        this.promoDescription = promoDescription;
        this.rating = rating;
        this.cars = new Array<Car>();
    }
}
