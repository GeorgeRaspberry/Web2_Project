import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeInOut', [
      state('initial', style({
        transform: 'translateY(-200%)',
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
export class FlightFilterComponent implements OnInit {
  currentState = 'initial';

  constructor() { }

  ngOnInit(): void {
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
}
