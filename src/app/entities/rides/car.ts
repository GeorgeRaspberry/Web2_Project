import { DatePipe, Time } from '@angular/common';


/*
naziv, 
marka, 
model, 
godina proizvodnje, 
broj sedišta, 
tip vozila,
*/
export class Car {
    id: number
    company: string;
    companyId: number
    carMaker: string;
    carModel: string;
    productionYear: Date;
    numberOfSeats: number;
    vehicleType: string;

    constructor(id: number, company: string, companyId: number, carMaker: string, carModel: string, productionYear: string, numberOfSeats: number, vehicleType: string) {
        this.id = id;
        this.company = company;
        this.companyId = companyId;
        this.carMaker = carMaker;
        this.carModel = carModel;
        this.productionYear = new Date(); //placeholder
        this.numberOfSeats = numberOfSeats;
        this.vehicleType = vehicleType;
    }
}
