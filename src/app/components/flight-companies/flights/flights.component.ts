import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/entities/flights/flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  @Input()
    flights: Flight[];


  constructor() {
    
  }

  book(): void {
    alert("Booked!");
  }

  ngOnInit(): void {
  }

}
