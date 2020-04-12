import { FcompanypageComponent } from './components/flight-companies/fcompanypage/fcompanypage.component';
import { Flight } from './entities/flights/flight';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RidesComponent } from './components/rides/rides.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightCompaniesComponent } from './components/flight-companies/flight-companies.component';


const routes: Routes = [
{
  path: "flightCompanies",
  component: FlightCompaniesComponent
},
{
  path: "rides",
  component: RidesComponent
},
{
  path: "flight",
  children: [
    { path: "", component: RidesComponent },  //placeholder
    { path: ":id/details", component: FcompanypageComponent },
    { path: ":id/book", component: FlightsComponent } //placeholder
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
