import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveInviteComponent } from './reserve-invite.component';

describe('ReserveInviteComponent', () => {
  let component: ReserveInviteComponent;
  let fixture: ComponentFixture<ReserveInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
