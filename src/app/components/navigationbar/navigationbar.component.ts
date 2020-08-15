import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(public service:ProfilePageService, private router:Router) { }
  ngOnInit(): void {
  }
  routeView()
  {

  }
  
}
