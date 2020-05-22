import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcompanyRegisterComponent } from './fcompany-register.component';

describe('FcompanyRegisterComponent', () => {
  let component: FcompanyRegisterComponent;
  let fixture: ComponentFixture<FcompanyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcompanyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcompanyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
