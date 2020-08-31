import { Ride } from './ride';
import { RideLocationTransfers } from '../flights/location-transfers';

export class RideCompany {
    id: number;
    name: string;
    image: string;
    address: string;
    promoDescription: string;
    rating: number;
    rides: Array<Ride>;
    numberOfTransfers:number;
    rideLocationTransfers: Array<RideLocationTransfers>;
    userID:string
    constructor()
    {
    }
}
