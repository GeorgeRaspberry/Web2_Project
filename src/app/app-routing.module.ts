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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
