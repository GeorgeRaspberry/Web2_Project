import { Ride } from 'src/app/entities/rides/ride';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { RideCompany } from 'src/app/entities/rides/ride-company';
import { Router } from '@angular/router';
import { LocationTransfers, RideLocationTransfers } from 'src/app/entities/flights/location-transfers';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';

@Component({
  selector: 'app-rcompany-register',
  templateUrl: './rcompany-register.component.html',
  styleUrls: ['./rcompany-register.component.css']
})
export class RcompanyRegisterComponent implements OnInit {

  url: any;
  constructor(public service: RideCompaniesService,public userService:ProfilePageService, private router: Router) {
    this.url = this.service.formData.image
  }

  ngOnInit(): void {
    this.userService.getAllUsers()

    if (this.service.formData.rideLocationTransfers!=null){
      this.service.formData.rideLocationTransfers.forEach(element => {
      });
    }
  }
  addRCompany(form:NgForm) {
    if (   (this.service.formData.address == null || this.service.formData.address == "") 
     ||(this.service.formData.promoDescription == null || this.service.formData.promoDescription == "") 
     ||(this.service.formData.image == null || this.service.formData.image == "")
     ||(this.service.formData.name == null || this.service.formData.name == "")
     ){
      alert("Not all inputs filled")
      return
     }

    if (this.service.formData.id == null || this.service.formData.id == 0)
    { 
      this.service.postRideCompany().subscribe(
          res=>{
            this.resetForm(form);
            this.router.navigateByUrl("/rideCompanies")
          }, 
          err=> {console.log(err);}
      );
    }else{
      this.service.putRideCompany().subscribe(
        res=>{
          this.resetForm(form);
          this.router.navigateByUrl("/rideCompanies")
        }, 
        err=> {console.log(err);}
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new RideCompany();
    this.url = null;
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.service.formData.image = this.url;
      }
    }
  }

}
