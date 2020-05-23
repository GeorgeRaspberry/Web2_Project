import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcompanyRegisterComponent } from './rcompany-register.component';

describe('RcompanyRegisterComponent', () => {
  let component: RcompanyRegisterComponent;
  let fixture: ComponentFixture<RcompanyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcompanyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcompanyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
