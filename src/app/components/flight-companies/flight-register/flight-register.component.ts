import { FlightRegisterService } from './../../../services/flights/flight-register.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {
  
  addFlight() {
    alert("Djum djum ?");
  }

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