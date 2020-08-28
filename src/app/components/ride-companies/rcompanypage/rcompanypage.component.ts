import { Component, OnInit } from '@angular/core';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesService } from 'src/app/services/rides/rides.service';
import { Ride } from 'src/app/entities/rides/ride';

@Component({
  selector: 'app-rcompanypage',
  templateUrl: './rcompanypage.component.html',
  styleUrls: ['./rcompanypage.component.css']
})
export class RcompanypageComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute, public service: RideCompaniesService,public rideService:RidesService, private router:Router) {
    route.params.subscribe(params => { this.id = params['id']; });
    service.loadCompanyData(this.id);
  }

  ngOnInit(): void {
  }
  addRide(){
    this.rideService.formData = new Ride()
    this.router.navigateByUrl("ride/"+this.id+"/register")
  }

}
