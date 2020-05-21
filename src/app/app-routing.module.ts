import { FlightRegisterComponent } from './components/flight-companies/flight-register/flight-register.component';
import { FcompanypageComponent } from './components/flight-companies/fcompanypage/fcompanypage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RidesComponent } from './components/rides/rides.component';
import { FlightCompaniesComponent } from './components/flight-companies/flight-companies.component';
import { RideCompaniesComponent } from './components/ride-companies/ride-companies.component';
import { RcompanypageComponent } from './components/ride-companies/rcompanypage/rcompanypage.component';
import { FlightsComponent } from './components/flight-companies/flights/flights.component';

const routes: Routes = [
{
  path: "flightCompanies",
  component: FlightCompaniesComponent
},
{
  path: "rideCompanies",
  component: RideCompaniesComponent
},
{
  path: "flight",
  children: [
    { path: "", component: RidesComponent },  //placeholder
    { path: ":id/details", component: FcompanypageComponent },
    { path: ":id/register", component: FlightRegisterComponent }
  ]
},
{
  path: "ride",
  children: [
    { path: "", component: RidesComponent },  //placeholder
    { path: ":id/details", component: RcompanypageComponent },
    { path: ":id/book", component: RidesComponent } //placeholder
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
