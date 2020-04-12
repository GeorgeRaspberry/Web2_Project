import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { FlightCompany } from 'src/app/entities/flights/flight-company';



@Component({
  selector: 'app-fcompanypage',
  templateUrl: './fcompanypage.component.html',
  styleUrls: ['./fcompanypage.component.css']
})
export class FcompanypageComponent implements OnInit {

  id:number;
  allCompanies: Array<FlightCompany>;

  constructor(private route: ActivatedRoute, private companiesService: FlightCompaniesService) {
    route.params.subscribe(params => { this.id = params['id']; });
    this.allCompanies = companiesService.loadCompanies();
  }

  ngOnInit(): void {
  }

}
