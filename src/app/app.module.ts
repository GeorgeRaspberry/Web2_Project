import {  HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
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
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FcompanyRegisterComponent } from './components/flight-companies/fcompany-register/fcompany-register.component';
import { ProfilePageComponent } from './components/login/profile-page/profile-page.component';
import { RcompanyRegisterComponent } from './components/ride-companies/rcompany-register/rcompany-register.component';
import { RideRegisterComponent } from './components/ride-companies/ride-register/ride-register.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FlightCompaniesService } from './services/flights/flight-companies.service';
import { FlightsService } from './services/flights/flights.service';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { BookFlightComponent } from './components/flight-companies/book-flight/book-flight.component';
import { ProfilePageService } from './services/users/profile-page.service';
import { RideFilterComponent } from './components/ride-companies/ride-filter/ride-filter.component';
import { RideCompaniesService } from './services/rides/ride-companies.service';
import { RidesService } from './services/rides/rides.service';
import { RidesComponent } from './components/ride-companies/rides/rides.component';
import { ReservationService } from './services/reservation-service';
import { RideReservationComponent } from './components/ride-companies/ride-reservation/ride-reservation.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SeatsComponent } from './components/flight-companies/seats/seats.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReserveInviteComponent } from './components/flight-companies/reserve-invite/reserve-invite.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';

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
    FcompanyRegisterComponent,
    ProfilePageComponent,
    RcompanyRegisterComponent,
    RideRegisterComponent,
    LocationPageComponent,
    BookFlightComponent,
    RideFilterComponent,
    RideReservationComponent,
    ReservationPageComponent,
    SeatsComponent,
    ReserveInviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatTooltipModule
    
  ],
  exports:[ MatButtonModule,MatTooltipModule  ],
  providers: [FlightsService,FlightCompaniesService,ProfilePageService,RideCompaniesService,RidesService,ReservationService],
    SocialLoginModule,
  ],
  providers: [FlightsService,FlightCompaniesService,ProfilePageService,RideCompaniesService,RidesService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('526182753424-fkg7mn4nnf43luqv2vt26dbm8of93vgf.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
