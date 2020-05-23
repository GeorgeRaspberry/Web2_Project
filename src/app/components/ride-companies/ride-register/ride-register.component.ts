import { RideRegisterService } from './../../../services/rides/ride-register.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@Component({
  selector: 'app-ride-register',
  templateUrl: './ride-register.component.html',
  styleUrls: ['./ride-register.component.css']
})
export class RideRegisterComponent implements OnInit {

  addRide() {
    alert("Djum djum ?");
  }

  constructor(private service: RideRegisterService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
  }

}
