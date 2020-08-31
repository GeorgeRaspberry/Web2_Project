import { Reservation } from '../entities/reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationFlight } from '../entities/reservationFlight';


@Injectable({
    providedIn: 'root'
  })
  
export class ReservationService {
    formData: Reservation;
    readonly rootURL = 'http://localhost:37240/api';
    type:Array<string>
    picked:number
    constructor(private http: HttpClient) {
    }

    reservations: Reservation[];
    postRideReservation() {
        return this.http.post(this.rootURL + '/Reservations/PostReservation', this.formData);
    }
    postFlightReservation(reservation:ReservationFlight) {
        return this.http.post(this.rootURL + '/Reservations/PostFlightReservation', reservation);
    }
    rateFlightReservation(id:number, rating:number){
        return this.http.put(this.rootURL + '/Reservations/RateFlightReservation/'+id+"/"+rating, null);
    }

    acceptInvite(id:string, reservationID:number){
        alert(id)
        alert(reservationID)
        this.http.get(this.rootURL + '/Reservations/ReserveAccept/'+ id+ "/"+ reservationID).subscribe(
            (res: any) => {
              alert('Reservation accepted!');
            },
            err => {
              if (err.status == 400)
                alert('Your URL is not correct!');
              else
                console.log(err);
            }
          )
    }
    refuseInvite(id:string, reservationID:number){
        this.http.get(this.rootURL + '/Reservations/ReserveRefuse/'+ id+ "/"+ reservationID).subscribe(
            (res: any) => {
              alert('Reservation refused!');
            },
            err => {
              if (err.status == 400)
                alert('Your URL is not correct!');
              else
                console.log(err);
            }
          )
    }

    loadReservations() {
        this.http.get(this.rootURL + '/Reservations/'+localStorage.getItem('token'))
        .toPromise()
        .then(res =>  {
            this.reservations = res as Array<Reservation>
        });
    }
    cancelReservation(id:number){
        return this.http.delete(this.rootURL + '/Reservations/'+ id);
    }
    rateRideReservation(id:number, rating:number){
        return this.http.put(this.rootURL + '/Reservations/RateRideReservation/'+id+"/"+rating, null);
    }
}