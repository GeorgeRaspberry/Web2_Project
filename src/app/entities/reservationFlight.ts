import { Reservation } from './reservation';
import { User } from './users/user';
import { Seat } from './flights/seat';



export class ReservationFlight{
    reservations:Array<Reservation>
    seats:Array<Seat>
    users:Array<User>
}

