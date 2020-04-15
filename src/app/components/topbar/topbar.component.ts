import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
