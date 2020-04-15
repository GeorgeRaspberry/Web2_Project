import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcompanypageComponent } from './rcompanypage.component';

describe('RcompanypageComponent', () => {
  let component: RcompanypageComponent;
  let fixture: ComponentFixture<RcompanypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcompanypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcompanypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
