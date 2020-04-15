import { TopbarComponent } from './components/topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
import { RidesComponent } from './components/rides/rides.component';
import { FlightCompaniesComponent } from './components/flight-companies/flight-companies.component';
import { FcompanypageComponent } from './components/flight-companies/fcompanypage/fcompanypage.component';
import { LoginComponent } from './components/login/login.component';
import { RideCompaniesComponent } from './components/ride-companies/ride-companies.component';
import { RcompanypageComponent } from './components/ride-companies/rcompanypage/rcompanypage.component';
import { RatingStarComponent } from './components/rating-star/rating-star.component';
import { FlightsComponent } from './components/flight-companies/flights/flights.component';
import { FlightFilterComponent } from './components/flight-companies/flight-filter/flight-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    FlightsComponent,
    RidesComponent,
    FlightCompaniesComponent,
    FcompanypageComponent,
    LoginComponent,
    RideCompaniesComponent,
    RcompanypageComponent,
    RatingStarComponent,
    FlightFilterComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
