import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RideCompaniesService } from 'src/app/services/rides/ride-companies.service';
import { RidesService } from 'src/app/services/rides/rides.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride } from 'src/app/entities/rides/ride';

@Component({
  selector: 'app-ride-register',
  templateUrl: './ride-register.component.html',
  styleUrls: ['./ride-register.component.css']
})
export class RideRegisterComponent implements OnInit {

 
  id:number
  constructor(public service: RidesService,public route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => { this.id = Number(params['id']); });
    this.service.loadTransfers()
  }
 addRide(form:NgForm) {
    if((this.service.formData.carMaker == null || this.service.formData.carMaker == "")
    || (this.service.formData.carModel == null || this.service.formData.carModel == "")
    || (this.service.formData.carType == null || this.service.formData.carType == "")
    || (this.service.formData.numberOfSeats == null || this.service.formData.numberOfSeats == 0)
    || (this.service.formData.productionYear == null)
    )
       {
      alert("Not all inputs are filled correctly")
      return
    }

    this.service.formData.companyID = this.id;

    if (this.service.formData.id == null || this.service.formData.id == 0)
    { 
      this.service.postRide().subscribe(
      res=>{
        this.resetForm(form);
        this.router.navigateByUrl('/ride/'+this.id+'/details');
      }, 
      err=> {console.log(err);}
    );
    }else{
      this.service.putRide().subscribe(
        res=>{
          this.resetForm(form);
          this.router.navigateByUrl('/ride/'+this.id+'/details');
        }, 
        err=> {console.log(err);}
      );
    }
  }
  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new Ride()
  }

  onChange($event) {
    this.service.formData.locationID = $event.target.value
  }
}
