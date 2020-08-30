import { RidesService } from 'src/app/services/rides/rides.service';
import { FlightCompany } from './../../../entities/flights/flight-company';
import { RideCompaniesService } from './../../../services/rides/ride-companies.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ride-filter',
  templateUrl: './ride-filter.component.html',
  styleUrls: ['./ride-filter.component.css'],
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
export class RideFilterComponent implements OnInit {

  @Input() state: number; //0 for companies, 1 for rides

  currentState = 'initial';
  selectedAddress: number;
  rideSelectedAddress: number;
  
  constructor(public service: RideCompaniesService, public ridesService: RidesService) { }

  ngOnInit(): void {
    this.service.loadTransfers();
    this.ridesService.loadRides();
    this.selectedAddress = 1;
    this.rideSelectedAddress = 1;
  }

  selectChangeHandler (event: any) {
    this.selectedAddress = event.target.value;
  }

  rideSelectChangeHandler (event: any) {
    this.rideSelectedAddress = event.target.value;
  }
  
  changeState() {
    this.service.loadCompanies();
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  rideChangeState() {
    this.ridesService.loadRides();
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  filterRideCompanies() {
    for (let i = this.service.companies.length-1; i >= 0; i--) {
      var element = this.service.companies[i];
      if (element.address != this.service.transfers[this.selectedAddress-1].name){
        this.service.companies.splice(i, 1);
      }
    };  
  }

  filterRides() {
    for (let i = this.ridesService.rides.length-1; i >= 0; i--) {
      var element = this.ridesService.rides[i];
      if (element.location.name != this.service.transfers[this.rideSelectedAddress-1].name){
        this.ridesService.rides.splice(i, 1);
      }
    };  
  }

  searchRideCompanies() {
    if (this.service.filterCompanyName != undefined){
      for (let i = this.service.companies.length-1; i >= 0; i--) {
        var element = this.service.companies[i];
        if (!element.name.toUpperCase().includes(this.service.filterCompanyName.toUpperCase())){
          this.service.companies.splice(i, 1);
        }
      };
    }
  }

  searchRides() {
    if (this.ridesService.filterRideName != undefined){
      for (let i = this.ridesService.rides.length-1; i >= 0; i--) {
        var element = this.ridesService.rides[i];
        if (!element.carMaker.toUpperCase().includes(this.ridesService.filterRideName.toUpperCase())){
          this.ridesService.rides.splice(i, 1);
        }
      };
    }
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

  rideSortUp() {
    if(this.ridesService.sortParametar != undefined){
      if (this.ridesService.sortParametar == 'CAR MAKER') {
        for (let i = 0; i < this.ridesService.rides.length-1; i++) {
          for (let j = i+1; j < this.ridesService.rides.length; j++) {
            if (this.ridesService.rides[i].carMaker[0] > this.ridesService.rides[j].carMaker[0]) {
              var temp = this.ridesService.rides[i];
              this.ridesService.rides[i] = this.ridesService.rides[j];
              this.ridesService.rides[j] = temp;
            }
          }
        }
      }
      if (this.ridesService.sortParametar == 'PRICE') {
        for (let i = 0; i < this.ridesService.rides.length-1; i++) {
          for (let j = i+1; j < this.ridesService.rides.length; j++) {
            if (this.ridesService.rides[i].price > this.ridesService.rides[j].price) {
              var temp = this.ridesService.rides[i];
              this.ridesService.rides[i] = this.ridesService.rides[j];
              this.ridesService.rides[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

  rideSortDown() {
    if(this.ridesService.sortParametar != undefined){
      if (this.ridesService.sortParametar == 'CAR MAKER') {
        for (let i = 0; i < this.ridesService.rides.length-1; i++) {
          for (let j = i+1; j < this.ridesService.rides.length; j++) {
            if (this.ridesService.rides[i].carMaker[0] < this.ridesService.rides[j].carMaker[0]) {
              var temp = this.ridesService.rides[i];
              this.ridesService.rides[i] = this.ridesService.rides[j];
              this.ridesService.rides[j] = temp;
            }
          }
        }
      }
      if (this.ridesService.sortParametar == 'PRICE') {
        for (let i = 0; i < this.ridesService.rides.length-1; i++) {
          for (let j = i+1; j < this.ridesService.rides.length; j++) {
            if (this.ridesService.rides[i].price < this.ridesService.rides[j].price) {
              var temp = this.ridesService.rides[i];
              this.ridesService.rides[i] = this.ridesService.rides[j];
              this.ridesService.rides[j] = temp;
            }
          }
        }
      }
    }
    else{
      alert("Select sort parameter, please.")
    }
  }

}
