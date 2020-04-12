import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcompanypageComponent } from './fcompanypage.component';

describe('FcompanypageComponent', () => {
  let component: FcompanypageComponent;
  let fixture: ComponentFixture<FcompanypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcompanypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcompanypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
