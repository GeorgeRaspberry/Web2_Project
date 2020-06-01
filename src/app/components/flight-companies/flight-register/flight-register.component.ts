import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { Flight } from 'src/app/entities/flights/flight';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {
  
  transfers: Array<string>;

  constructor(public route: ActivatedRoute,public service: FlightsService) { }

  ngOnInit(): void {
    this.resetForm();
    this.route.params.subscribe(params => { this.service.formData.companyId = params['id']; });
  }
  addFlight(form:NgForm) {
    this.service.postFlight().subscribe(
      res=>{
        this.resetForm(form);
      }, 
      err=> {console.log(err);}

  );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new Flight(0,0,"","","",0,0,"",0);
  }
  
}