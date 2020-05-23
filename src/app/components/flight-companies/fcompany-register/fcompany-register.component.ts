import { FcompanyRegisterService } from 'src/app/services/flights/fcompany-register.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fcompany-register',
  templateUrl: './fcompany-register.component.html',
  styleUrls: ['./fcompany-register.component.css']
})
export class FcompanyRegisterComponent implements OnInit {

  addFCompany() {
    alert("Djum djum ?");
  }

  destinations: Array<string>;

  constructor(private service: FcompanyRegisterService) { }

  ngOnInit(): void {
    this.destinations[0] = "Beograd";
    this.destinations[1] = "Dubai";
    this.destinations[2] = "London";
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
  }

}
