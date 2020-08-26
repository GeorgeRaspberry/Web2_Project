import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { Flight } from 'src/app/entities/flights/flight';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/entities/flights/location';


@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {
  array = Array;
  math = Math;

  transfers: Array<Location>;
  id: number;
  constructor(public service: FlightsService,public route: ActivatedRoute, private router: Router) { 
    this.resetForm();
    this.route.params.subscribe(params => { this.id = Number(params['id']); });
    this.service.formData.locationTransfers = new Array();
    this.service.loadTransfers()
    
  }

  ngOnInit(): void {
  }
  addFlight(form:NgForm) {
    /*if (this.service.formData.flyOffTime == null || this.service.formData.landingTime == null 
      || /^[0-9][0-9]:[0-9][0-9]$/.test(this.service.formData.fullFlightTime) == false 
      || (this.service.formData.flightLength == null || this.service.formData.flightLength < 0) || (this.service.formData.price == null || this.service.formData.price < 0) )
    {
      alert("Not all inputs are filled correctly")
      return
    }*/

    if (this.service.formData.numberOfTransfers > 1){
      for (let location of this.service.formData.locationTransfers){
        location.locationID = Number(location.locationID)

        if (location.locationID == 0){
          alert("Not all transfers are entered.")
          return
        }
      }
    }
    this.service.formData.companyId = this.id;
    this.service.formData.locationTransfers[0].status = 1
    this.service.formData.locationTransfers[this.service.formData.locationTransfers.length - 1].status = 2
    this.service.postFlight().subscribe(
      res=>{
        this.resetForm(form);
        this.router.navigateByUrl('/flight/'+this.id+'/details');
      }, 
      err=> {console.log(err);}
    );
  }
  objChanged(event: any)
  {
    if (event.target.value <=1){
      alert("Must have at least two transfers.")
      return
    }
    this.service.formData.locationTransfers = new Array();
    for (let i = 0 ; i < event.target.value; i++){
      this.service.formData.locationTransfers.push(new Location());
    }
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new Flight();
  }
  
}