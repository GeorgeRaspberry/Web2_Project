import { Component, OnInit } from '@angular/core';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-flight-companies',
  templateUrl: './flight-companies.component.html',
  styleUrls: ['./flight-companies.component.css']
  
  
})
export class FlightCompaniesComponent implements OnInit {
  selectedCompany: FlightCompany;
  isButtonVisible:boolean;

  constructor(public companiesService: FlightCompaniesService, public service:ProfilePageService) {
    this.companiesService.loadCompanies();
    this.isButtonVisible = false;
  }

  ngOnInit(): void {

  }

  onClick(company: FlightCompany) {
      this.selectedCompany = company;
      console.log(this.selectedCompany);
  }
  deleteCompany(id:number)
  {
    this.companiesService.deleteFlightCompany(id).subscribe(
      res=>{
        this.companiesService.loadCompanies();
      }, 
      err=> {console.log(err);}
    );
  }

}
