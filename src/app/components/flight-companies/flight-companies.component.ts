import { Component, OnInit } from '@angular/core';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-companies',
  templateUrl: './flight-companies.component.html',
  styleUrls: ['./flight-companies.component.css']
  
  
})
export class FlightCompaniesComponent implements OnInit {
  selectedCompany: FlightCompany;
  isButtonVisible:boolean;

  constructor(public companiesService: FlightCompaniesService, public service:ProfilePageService, private router: Router) {
    this.companiesService.companies = new Array()
    this.companiesService.loadCompanies();
    this.isButtonVisible = false;
  }

  ngOnInit(): void {
  }

  onClick(company: FlightCompany) {
      this.selectedCompany = company;
  }

  addCompany(){
    this.companiesService.formData = new FlightCompany()
    this.router.navigateByUrl("/newFCompany")
  }
  
  updateCompany(company:FlightCompany){
    this.companiesService.formData = company
    this.router.navigateByUrl("/newFCompany")
  }

  deleteCompany(id:number)
  {
    this.companiesService.deleteFlightCompany(id).subscribe(
      res=>{
        this.companiesService.companies = new Array()
        this.companiesService.loadCompanies();
      }, 
      err=> {console.log(err);}
    );
  }

}
