import { UserRole } from './user-role.enum';

export class User {
    id: string;
    name: string;
    lastname: string;
    fullName: string;
    city: string;
    phoneNumber: number;
    email: string;
    userName: string;
    password: string;
    role: string;
    authenticate: number;
    sentRequests: Array<Request>;
    receivedRequests: Array<Request>;
    friendsList: Array<User>;
    status:number
    points:number
    constructor()
    {
        this.role = "";
    } 
}
