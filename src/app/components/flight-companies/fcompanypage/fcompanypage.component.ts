import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-fcompanypage',
  templateUrl: './fcompanypage.component.html',
  styleUrls: ['./fcompanypage.component.css']
})
export class FcompanypageComponent implements OnInit {

  id: number;

  constructor(public route: ActivatedRoute, public service: FlightCompaniesService, public userService:ProfilePageService) {
    this.service.company = new FlightCompany()
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.service.loadCompanyData(this.id);
  }

  ngOnInit(): void {
  }
}