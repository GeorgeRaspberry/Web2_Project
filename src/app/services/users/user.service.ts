import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users/user';
import { UserRole } from 'src/app/entities/users/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser:User;
  constructor() {
    this.loggedInUser = new User('','','','', null, '', '', '', UserRole.NotLoggedIn);
  }

  loadUsers() {
    return this.mockedUsers();
  }
  mockedUsers()
  {
    let allUsers = new Array<User>();

    const u1 = new User('','','','', null, '','admin','admin',UserRole.Administrator);
    const u2 = new User('','','','', null, '','adminride','adminride',UserRole.RideAdministrator);
    const u3 = new User('','','','', null, '','adminflight','adminflight',UserRole.FlightAdministrator);
    const u4 = new User('','','','', null, '','user','user',UserRole.Registered);

    allUsers.push(u1);
    allUsers.push(u2);
    allUsers.push(u3);
    allUsers.push(u4);
    

    return allUsers; 
  }
}
