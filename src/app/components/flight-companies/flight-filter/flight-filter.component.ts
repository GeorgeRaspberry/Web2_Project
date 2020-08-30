import { Flight } from 'src/app/entities/flights/flight';
import { FlightsService } from './../../../services/flights/flights.service';
import { FlightCompany } from './../../../entities/flights/flight-company';
import { FlightCompaniesService } from './../../../services/flights/flight-companies.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeInOut', [
      state('initial', style({
        transform: 'translateY(-100%)',
        opacity: 0

  })),
      state('final', style({
        transform: 'translateY(0%)',
        opacity: 1
  })),
      transition('initial => final', animate(800)),
      transition('final => initial', animate(800)),
    ])
   
  ]

})
export class FlightFilterComponent implements OnInit {
  @Input() state: number; //0 for companies, 1 for rides

  currentState = 'initial';
  flyOffTime: Date;
  landingTime: Date;
  startingDestination: number;
  endingDestination: number;

  constructor(public service: FlightCompaniesService, public flightsService: FlightsService) { }

  ngOnInit(): void {
    this.flightsService.loadTransfers();
    this.flyOffTime = new Date();
    this.landingTime = new Date();
    this.startingDestination = 1;
    this.endingDestination = 1;
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.service.loadCompanies();
  }

  flightChangeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.service.loadCompanyData(this.service.company.id);
  }

  searchFlightCompanies() {
    if (this.service.filterCompanyName != undefined){
      for (let i = this.service.companies.length-1; i >= 0; i--) {
        var element = this.service.companies[i];
        if (!element.name.toUpperCase().includes(this.service.filterCompanyName.toUpperCase())){
          this.service.companies.splice(i, 1);
        }
      };
    }
  }

  startingDestinationChangeHandler(event: any){
    this.startingDestination = event.target.value;
  }

  endingDestinationChangeHandler(event: any){
    this.endingDestination = event.target.value;
  }

  sortUp() {
    if(this.service.sortParametar != undefined){
      if (this.service.sortParametar == 'NAME') {
        for (let i = 0; i < this.service.companies.length-1; i++) {
          for (let j = i+1; j < this.service.companies.length; j++) {
            if (this.service.companies[i].name[0] > this.service.companies[j].name[0]) {
              var temp = this.service.companies[i];
              this.service.companies[i] = this.service.companies[j];
              this.service.companies[j] = temp;
            }
          }
        }
      }
      if (this.service.sortParametar == 'RATING') {
        for (let i = 0; i < this.service.companies.length-1; i++) {
          for (let j = i+1; j < this.service.companies.length; j++) {
            if (this.service.companies[i].rating > this.service.companies[j].rating) {
              var temp = this.service.companies[i];
              this.service.companies[i] = this.service.companies[j];
              this.service.companies[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

  sortDown() {
    if(this.service.sortParametar != undefined){
      if (this.service.sortParametar == 'NAME') {
        for (let i = 0; i < this.service.companies.length-1; i++) {
          for (let j = i+1; j < this.service.companies.length; j++) {
            if (this.service.companies[i].name[0] < this.service.companies[j].name[0]) {
              var temp = this.service.companies[i];
              this.service.companies[i] = this.service.companies[j];
              this.service.companies[j] = temp;
            }
          }
        }
      }
      if (this.service.sortParametar == 'RATING') {
        for (let i = 0; i < this.service.companies.length-1; i++) {
          for (let j = i+1; j < this.service.companies.length; j++) {
            if (this.service.companies[i].rating < this.service.companies[j].rating) {
              var temp = this.service.companies[i];
              this.service.companies[i] = this.service.companies[j];
              this.service.companies[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

  flightSortUp() {
    if(this.flightsService.sortParametar != undefined){
      if (this.flightsService.sortParametar == 'TRANSFER NUMBER') {
        for (let i = 0; i < this.service.company.flights.length-1; i++) {
          for (let j = i+1; j < this.service.company.flights.length; j++) {
            if (this.service.company.flights[i].numberOfTransfers > this.service.company.flights[j].numberOfTransfers) {
              var temp = this.service.company.flights[i];
              this.service.company.flights[i] = this.service.company.flights[j];
              this.service.company.flights[j] = temp;
            }
          }
        }
      }
      if (this.flightsService.sortParametar == 'PRICE') {
        for (let i = 0; i < this.service.company.flights.length-1; i++) {
          for (let j = i+1; j < this.service.company.flights.length; j++) {
            if (this.service.company.flights[i].price > this.service.company.flights[j].price) {
              var temp = this.service.company.flights[i];
              this.service.company.flights[i] = this.service.company.flights[j];
              this.service.company.flights[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

  flightSortDown() {
    if(this.flightsService.sortParametar != undefined){
      if (this.flightsService.sortParametar == 'TRANSFER NUMBER') {
        for (let i = 0; i < this.service.company.flights.length-1; i++) {
          for (let j = i+1; j < this.service.company.flights.length; j++) {
            if (this.service.company.flights[i].numberOfTransfers < this.service.company.flights[j].numberOfTransfers) {
              var temp = this.service.company.flights[i];
              this.service.company.flights[i] = this.service.company.flights[j];
              this.service.company.flights[j] = temp;
            }
          }
        }
      }
      if (this.flightsService.sortParametar == 'PRICE') {
        for (let i = 0; i < this.service.company.flights.length-1; i++) {
          for (let j = i+1; j < this.service.company.flights.length; j++) {
            if (this.service.company.flights[i].price < this.service.company.flights[j].price) {
              var temp = this.service.company.flights[i];
              this.service.company.flights[i] = this.service.company.flights[j];
              this.service.company.flights[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

  filterFlightsDestination() {
    var startDestination = this.flightsService.transfers[this.startingDestination-1].name;
    var endDestination = this.flightsService.transfers[this.endingDestination-1].name;
    //filter by location
    for (let i = this.service.company.flights.length-1; i >= 0; i--) {
        if (this.service.company.flights[i].locationTransfers[0].location.name != startDestination
          || this.service.company.flights[i].locationTransfers[this.service.company.flights[i].locationTransfers.length-1].location.name
          != endDestination) {
          this.service.company.flights.splice(i,1);
        }
    }
  }

  filterFlightsDate(){
    this.flightsService.filterDates(this.service.company.id, this.flyOffTime, this.landingTime);
  }

}
