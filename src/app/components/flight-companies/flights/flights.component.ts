import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/entities/flights/flight';
import { FlightsService } from 'src/app/services/flights/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  @Input()
    companyId: number;

  allFlights: Array<Flight>;

  constructor(private flightService: FlightsService) {

    this.allFlights = this.flightService.mockedFlights();
    
  }

  book(): void {
    alert("Booked!");
  }

  ngOnInit(): void {

    for (let i = 0; i < this.allFlights.length; i++) {

      if (this.allFlights[i].companyId != this.companyId) {
        this.allFlights.splice(i, 1);
        i-=1;
      }
      
    }

  }

}
