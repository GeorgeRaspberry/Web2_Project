import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideReservationComponent } from './ride-reservation.component';

describe('RideReservationComponent', () => {
  let component: RideReservationComponent;
  let fixture: ComponentFixture<RideReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
