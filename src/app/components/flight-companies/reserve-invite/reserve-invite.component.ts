import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-invite',
  templateUrl: './reserve-invite.component.html',
  styleUrls: ['./reserve-invite.component.css']
})
export class ReserveInviteComponent implements OnInit {

  constructor(public service:ReservationService, public router:Router) { }

  ngOnInit(): void {
  }
  accept(){
    
    var splitRoute = this.router.url.split('/',4);
    var id = splitRoute[2];
    var idReserve = splitRoute[3];
    this.service.acceptInvite(id,Number(idReserve))
  }
  refuse(){
    var splitRoute = this.router.url.split('/', 4);
    var id = splitRoute[2];
    var idReserve = splitRoute[3];

    this.service.refuseInvite(id,Number(idReserve))
  }
}
