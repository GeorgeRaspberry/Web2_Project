import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
import { FlightsComponent } from './components/flights/flights.component';
import { RidesComponent } from './components/rides/rides.component';
import { FlightCompaniesComponent } from './components/flight-companies/flight-companies.component';
import { FcompanypageComponent } from './components/flight-companies/fcompanypage/fcompanypage.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    FlightsComponent,
    RidesComponent,
    FlightCompaniesComponent,
    FcompanypageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
