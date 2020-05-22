import { Component, OnInit } from '@angular/core';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { UserService } from 'src/app/services/users/user.service';
import { transition, state, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-flight-companies',
  templateUrl: './flight-companies.component.html',
  styleUrls: ['./flight-companies.component.css']
  
  
})
export class FlightCompaniesComponent implements OnInit {
  allFlightCompanies: Array<FlightCompany>;
  filteredCompanies: Array<FlightCompany>;
  selectedCompany: FlightCompany;
  isButtonVisible:boolean;

  constructor(private companiesService: FlightCompaniesService) {
    this.allFlightCompanies = this.companiesService.loadCompanies();
    this.filteredCompanies = this.allFlightCompanies;
    this.isButtonVisible = false;
  }

  ngOnInit(): void {

  }

  onClick(company: FlightCompany) {
      this.selectedCompany = company;
      console.log(this.selectedCompany);
  }

}