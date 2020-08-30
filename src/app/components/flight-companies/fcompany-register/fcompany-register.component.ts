import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { FlightCompany } from 'src/app/entities/flights/flight-company';
import { FlightCompaniesService } from 'src/app/services/flights/flight-companies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fcompany-register',
  templateUrl: './fcompany-register.component.html',
  styleUrls: ['./fcompany-register.component.css']
})
export class FcompanyRegisterComponent implements OnInit {

  url: any;
  constructor(public service: FlightCompaniesService,private router: Router) {
    this.url = this.service.formData.image
  }

  ngOnInit(): void {
  }
  addFCompany(form:NgForm) {
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
      this.service.postFlightCompany().subscribe(
          res=>{
            this.resetForm(form);
            this.router.navigateByUrl("/flightCompanies")
          }, 
          err=> {console.log(err);}
      );
    }else{
      this.service.putFlight().subscribe(
        res=>{
          this.resetForm(form);
          this.router.navigateByUrl("/flightCompanies")
        }, 
        err=> {console.log(err);}
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = new FlightCompany();
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
