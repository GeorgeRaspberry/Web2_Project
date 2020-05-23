import { ProfilePageService } from './../../../services/users/profile-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  saveChanges() {
    if (window.confirm('Are you sure?'))
    {
        // They clicked Yes
    }
    else
    {
        // They clicked no
    }
  }

  constructor(private service: ProfilePageService) { }

  ngOnInit(): void {
    
  }

}
