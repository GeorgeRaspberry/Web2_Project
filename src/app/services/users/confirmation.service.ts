import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  readonly rootURL = 'http://localhost:37240/api';

  constructor(private http: HttpClient) { }

  confirmAccount(id:string) {
    this.http.get(this.rootURL + '/ApplicationUser/Confirm/'+ id).subscribe(
      (res: any) => {
        alert('Account confirmed!');
      },
      err => {
        if (err.status == 400)
          alert('Your URL is not correct!');
        else
          console.log(err);
      }
    )
  }
}
