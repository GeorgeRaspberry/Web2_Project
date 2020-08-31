import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/entities/flights/seat';
import { ReservationService } from 'src/app/services/reservation-service';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  
  @Input() isAdmin:number;
  @Input() seats:Array<Seat>;

  array = Array;
  math = Math;
  constructor(public service: ReservationService) { }
  ngOnInit(): void {
    this.service.type = new Array()
    for (let i = 0 ; i < 40;i++){
      if (this.seats[i].type == 4){
        this.service.type[i] = "TAKEN"
      }else
      if (this.seats[i].type == 0){
        this.service.type[i] = "ECO"
      }else if (this.seats[i].type == 1){
        this.service.type[i] = "BUS"
      }else if (this.seats[i].type == 2){
        this.service.type[i] = "FIRST"
      }else if (this.seats[i].type == 3){
        this.service.type[i] = "DIS"
      }else if (this.seats[i].type == 4){
        this.service.type[i] = "TAKEN"
      }
    }
  }
  onClick(i:number,j:number) {
    let order = i*10 + j
    
    if (this.seats[order].type==4)
    {
      alert("CANT CHANGE USED SEATS")
      return
    }
    this.seats[order].type += 1
    if (this.seats[order].type > 3){
      this.seats[order].type = 0
    }
    if (this.seats[i].type == 4){
      this.service.type[i] = "TAKEN"
    }else
    if (this.seats[order].type == 0){
      this.service.type[order] = "ECO"
    }else if (this.seats[order].type == 1){
      this.service.type[order] = "BUS"
    }else if (this.seats[order].type == 2){
      this.service.type[order] = "FIRST"
    }else if (this.seats[order].type == 3){
      this.service.type[order] = "DIS"
    }else if (this.seats[order].type == 4){
      this.service.type[order] = "TAKEN"
    }
  }
  onClickReserve(i:number,j:number) {
    let order = i*10 + j
    if (this.service.formData.numberOfPeople == null){
      alert("First select how many people")
      return
    }
    if (this.seats[order].type ==3){
      alert("This seat is disabled")
      return
    }

    if (this.seats[order].type==4 )
    {
      alert("This seat is taken")
      return
    }
    if (this.seats[order].type>4){
      this.service.picked++
      this.seats[order].type -=5
    }else if (this.seats[order].type <=4){
      if (0 == this.service.picked)
      {
        alert("Can't select more")
        return
      }
      this.service.picked--
      this.seats[order].type +=5
    }
    if (this.seats[order].type > 4){
      this.service.type[order] = "PICK"
    }else if (this.seats[order].type == 0){
      this.service.type[order] = "ECO"
    }else if (this.seats[order].type == 1){
      this.service.type[order] = "BUS"
    }else if (this.seats[order].type == 2){
      this.service.type[order] = "FIRST"
    }else if (this.seats[order].type == 3){
      this.service.type[order] = "DIS"
    }
    else if (this.seats[order].type == 4){
      this.service.type[order] = "TAKEN"
    }
  }
}
