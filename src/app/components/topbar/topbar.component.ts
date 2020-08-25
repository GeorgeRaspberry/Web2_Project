import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user';
import { ProfilePageService } from 'src/app/services/users/profile-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  loggedUser:User;
  constructor(public service:ProfilePageService, public router: Router) { }
  
  ngOnInit(): void {
    console.log(this.service.loggedUser.role);
  }

  logOut()
  {
    localStorage.removeItem('token');
    this.service.loggedUser = new User();
    this.router.navigateByUrl('/flightCompanies');
  }
  onClickSocial(num: number) {
    if (num == 1) {
      alert("Facebook opened!");
    }
    else if (num == 2) {
      alert("Twitter opened!");
    }
    else if (num == 3) {
      alert("Instagram opened!");
    }
  }

}
