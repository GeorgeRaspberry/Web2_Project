import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "send message";
  temp:boolean = true;
  constructor() { }
  
  ngOnInit(): void {
  }

  changeBoolean()
  {
    this.temp = false;
  }
  changeBoolean2()
  {
    this.temp = true;
  }

  sendMessage() {
    this.messageEvent.emit()
  }
}
