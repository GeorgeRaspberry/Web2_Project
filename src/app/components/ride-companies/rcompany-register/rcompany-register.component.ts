import { Car } from 'src/app/entities/rides/car';
import { RcompanyRegisterService } from './../../../services/rides/rcompany-register.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rcompany-register',
  templateUrl: './rcompany-register.component.html',
  styleUrls: ['./rcompany-register.component.css']
})
export class RcompanyRegisterComponent implements OnInit {

  addRideCompany() {
    alert("Djum djum ?");
  }

  cars: Array<Car>;

  constructor(private service: RcompanyRegisterService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
  }

}
