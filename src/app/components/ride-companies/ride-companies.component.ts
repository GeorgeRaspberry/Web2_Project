import { Component, OnInit } from '@angular/core';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-companies',
  templateUrl: './ride-companies.component.html',
  styleUrls: ['./ride-companies.component.css']
})
export class RideCompaniesComponent implements OnInit {
  selectedCompany: RideCompany;

  constructor(public companiesService: RideCompaniesService, private router: Router) {
    this.companiesService.loadCompanies();
  }

  ngOnInit(): void {

  }

  onClick(company: RideCompany) {
    this.selectedCompany = company;
  }

  addCompany(){
    this.companiesService.formData = new RideCompany()
    this.router.navigateByUrl("/newRCompany")
  }
  
  updateCompany(company:RideCompany){
    this.companiesService.formData = company
    this.router.navigateByUrl("/newRCompany")
  }


  deleteCompany(id:number)
  {
    this.companiesService.deleteRideCompany(id).subscribe(
      res=>{
        this.companiesService.loadCompanies();
      }, 
      err=> {console.log(err);}
    );
  }
}
