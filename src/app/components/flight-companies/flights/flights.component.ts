import { FlightsService } from 'src/app/services/flights/flights.service';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/entities/flights/flight';
import { Router } from '@angular/router';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  @Input() flights: Flight[];


  constructor(public companyService: FlightCompaniesService, public service: FlightsService,public userService:ProfilePageService, private router: Router) {
  }

  book(): void {
    alert("Booked!");
  }

  ngOnInit(): void {
  }

}
