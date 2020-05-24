import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ride-filter',
  templateUrl: './ride-filter.component.html',
  styleUrls: ['./ride-filter.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeInOut', [
      state('initial', style({
        transform: 'translateY(-100%)',
        opacity: 0

  })),
      state('final', style({
        transform: 'translateY(0%)',
        opacity: 1
  })),
      transition('initial => final', animate(800)),
      transition('final => initial', animate(800)),
    ])
  ]
})
export class RideFilterComponent implements OnInit {
  currentState = 'initial';

  constructor() { }

  ngOnInit(): void {
  }
  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
