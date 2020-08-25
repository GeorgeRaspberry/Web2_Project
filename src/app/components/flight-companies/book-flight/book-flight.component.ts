import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  id:number
  constructor(public service: FlightsService,public route: ActivatedRoute) { 
    this.route.params.subscribe(params => { this.id = Number(params['id']); });
    this.service.loadFlight(this.id)    
    alert(this.id)
  }

  ngOnInit(): void {
  }

}
