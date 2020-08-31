import { Flight } from './flights/flight';
import { Ride } from './rides/ride';
import { User } from './users/user';
import { Seat } from './flights/seat';

export class Reservation {
    id: number
    reservationType: number;
    rideID: number
    ride: Ride;
    rideRating:number
    rentRideStart:Date;
    rideRentDays: number;
    flightID: number;
    flight: Flight;
    bagCount: number
    numberOfPeople:number
    flightRating:number
    userID: string;
    user:User;
    statusRide:number;
    statusFlight:number;
    price:number
    seats:Array<Seat>
    constructor() { }
}
