import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCompaniesComponent } from './ride-companies.component';

describe('RideCompaniesComponent', () => {
  let component: RideCompaniesComponent;
  let fixture: ComponentFixture<RideCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
