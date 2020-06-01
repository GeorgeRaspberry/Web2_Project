import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users/user';
import { UserRole } from 'src/app/entities/users/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser:User;
  constructor() {
    this.loggedInUser = new User('','','', 0, '', '', '', "Registered");
  }

  loadUsers() {
    return this.mockedUsers();
  }
  mockedUsers()
  {
    let allUsers = new Array<User>();

    const u1 = new User('','','', 0, '','admin','admin',"Registered");
    const u2 = new User('','','', 0, '','adminride','adminride',"Registered");
    const u3 = new User('','','', 0, '','adminflight','adminflight',"Registered");
    const u4 = new User('','','', 0, '','user','user',"Registered");

    allUsers.push(u1);
    allUsers.push(u2);
    allUsers.push(u3);
    allUsers.push(u4);
    

    return allUsers; 
  }
}
