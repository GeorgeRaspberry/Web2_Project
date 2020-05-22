import { FlightRegisterService } from './services/flights/flight-register.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { FlightRegisterComponent } from './components/flight-companies/flight-register/flight-register.component';
import { FormsModule } from '@angular/forms';
import { FcompanyRegisterComponent } from './components/flight-companies/fcompany-register/fcompany-register.component';

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
    TopbarComponent,
    FlightRegisterComponent,
    FcompanyRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FlightRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
