import { UserRole } from './user-role.enum';

export class User {
    id: number;
    name: string;
    lastname: string;
    city: string;
    phoneNumber: number;
    email: string;
    userName: string;
    password: string;
    role: string;
    authenticate: number

    constructor()
    {
        this.role = ""
    }
}
