import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAnimationComponent } from './homepage-animation.component';

describe('HomepageAnimationComponent', () => {
  let component: HomepageAnimationComponent;
  let fixture: ComponentFixture<HomepageAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
