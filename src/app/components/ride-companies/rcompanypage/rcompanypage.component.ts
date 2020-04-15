import { Component, OnInit } from '@angular/core';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rcompanypage',
  templateUrl: './rcompanypage.component.html',
  styleUrls: ['./rcompanypage.component.css']
})
export class RcompanypageComponent implements OnInit {

  id: number;
  allCompanies: Array<RideCompany>;

  constructor(private route: ActivatedRoute, private companiesService: RideCompaniesService) {
    route.params.subscribe(params => { this.id = params['id']; });
    this.allCompanies = companiesService.loadCompanies();
  }

  ngOnInit(): void {
  }

}
