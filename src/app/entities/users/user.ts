import { UserRole } from './user-role.enum';

export class User {
    id: number;
    name: string;
    lastname: string;
    city: string;
    phoneNumber: number;
    email: string;
    username: string;
    password: string;
    role: string;

    constructor(name: string, lastname: string, city: string, phoneNumber: number, email: string, username: string, password:string, role:string)
    {
        this.id = 0;
        this.name = name;
        this.lastname = lastname;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
