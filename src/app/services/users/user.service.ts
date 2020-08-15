import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users/user';
import { UserRole } from 'src/app/entities/users/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser:User;
  constructor() {
    this.loggedInUser = new User();
  }

  loadUsers() {
    return this.mockedUsers();
  }
  mockedUsers()
  {
    let allUsers = new Array<User>();



    return allUsers; 
  }
}
