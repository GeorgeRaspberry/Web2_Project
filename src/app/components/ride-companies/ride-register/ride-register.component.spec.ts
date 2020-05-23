import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRegisterComponent } from './ride-register.component';

describe('RideRegisterComponent', () => {
  let component: RideRegisterComponent;
  let fixture: ComponentFixture<RideRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
