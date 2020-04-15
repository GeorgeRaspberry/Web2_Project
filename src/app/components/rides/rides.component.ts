import { RidesService } from './../../services/rides/rides.service';
import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/entities/rides/car';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  @Input()
  companyId: number;

  allCars: Array<Car>;

  constructor(private carService: RidesService) {

    this.allCars = this.carService.mockedCars();
  
  }

  drive() {
    alert("Car has been taken!");
  }

  ngOnInit(): void {

    for (let i = 0; i < this.allCars.length; i++) {

      if (this.allCars[i].companyId != this.companyId) {
        this.allCars.splice(i, 1);
        i-=1;
      }
      
    }

  }

}
