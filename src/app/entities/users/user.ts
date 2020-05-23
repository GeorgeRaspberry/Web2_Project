import { UserRole } from './user-role.enum';

export class User {
    name: string;
    lastname: string;
    image: string;
    city: string;
    phoneNumber: Array<number>;
    email: string;
    username: string;
    password: string;
    role: UserRole;

    constructor(name: string, lastname: string, image: string, city: string, phoneNumber: Array<number>, email: string, username: string, password:string, role:UserRole)
    {
        this.name = name;
        this.lastname = lastname;
        this.city = city;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
