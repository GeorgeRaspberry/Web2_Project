import { Component, OnInit } from '@angular/core';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';

@Component({
  selector: 'app-ride-companies',
  templateUrl: './ride-companies.component.html',
  styleUrls: ['./ride-companies.component.css']
})
export class RideCompaniesComponent implements OnInit {

  allRideCompanies: Array<RideCompany>;
  filteredCompanies: Array<RideCompany>;
  selectedCompany: RideCompany;

  constructor(private companiesService: RideCompaniesService) {
    this.allRideCompanies = this.companiesService.loadCompanies();
    this.filteredCompanies = this.allRideCompanies;
  }

  ngOnInit(): void {

  }

  onClick(company: RideCompany) {
      this.selectedCompany = company;
      console.log(this.selectedCompany);
  }
}
