import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightRegisterService } from './../../../services/flights/flight-register.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {
  
  transfers: Array<string>;

  addFlight() {
    alert("Djum djum ?");
  }

  companies: Array<FlightCompany>;

  @Input() 
    companyId: number;

  constructor(private service: FlightRegisterService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData.CreateTest(0, 'asdf');
  }
  
}