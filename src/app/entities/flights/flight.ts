export class Flight {
    id: number;
    name: string;
    address: string;
    promoDescription: string;
    rating: number;
    destinationInfo: Array<string>;

    constructor(id: number, name: string, address: string, promoDescription: string, rating: number)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.promoDescription = promoDescription;
        this.rating = rating;
        this.destinationInfo = new Array<string>();
    }
}
