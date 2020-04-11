import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCompaniesComponent } from './flight-companies.component';

describe('FlightCompaniesComponent', () => {
  let component: FlightCompaniesComponent;
  let fixture: ComponentFixture<FlightCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
