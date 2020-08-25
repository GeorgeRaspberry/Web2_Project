import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/services/users/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(public service: ConfirmationService, private router: Router) { 
  }

  ngOnInit(): void {
    var splitRoute = this.router.url.split('/', 3);
    var id = splitRoute[2];
    this.service.confirmAccount(id);

    this.router.navigateByUrl('/flightCompanies');
  }
}
