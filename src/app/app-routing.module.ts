import { ConfirmationComponent } from './components/login/confirmation/confirmation.component';
import { RideRegisterComponent } from './components/ride-companies/ride-register/ride-register.component';
import { ProfilePageComponent } from './components/login/profile-page/profile-page.component';
import { FcompanyRegisterComponent } from './components/flight-companies/fcompany-register/fcompany-register.component';
import { FlightRegisterComponent } from './components/flight-companies/flight-register/flight-register.component';
import { FcompanypageComponent } from './components/flight-companies/fcompanypage/fcompanypage.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RidesComponent } from './components/rides/rides.component';
import { FlightCompaniesComponent } from './components/flight-companies/flight-companies.component';
import { RideCompaniesComponent } from './components/ride-companies/ride-companies.component';
import { RcompanypageComponent } from './components/ride-companies/rcompanypage/rcompanypage.component';
import { FlightsComponent } from './components/flight-companies/flights/flights.component';
import { RcompanyRegisterComponent } from './components/ride-companies/rcompany-register/rcompany-register.component';

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
  path: "newFCompany",
  component: FcompanyRegisterComponent
},
{
  path: "newRCompany",
  component: RcompanyRegisterComponent
},
{
  path: "profilePage",
  component: ProfilePageComponent
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
  path: "confirm",
  children: [
    { path: ":id", component: ConfirmationComponent },
  ]
},
{
  path: "ride",
  children: [
    { path: "", component: RidesComponent },  //placeholder
    { path: ":id/details", component: RcompanypageComponent },
    { path: ":id/register", component: RideRegisterComponent },
    { path: ":id/book", component: RidesComponent } //placeholder
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
