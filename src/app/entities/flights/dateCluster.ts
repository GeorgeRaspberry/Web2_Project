export class dateCluster {
    iD: number;
    flyoffDate: Date
    landingDate: Date

    constructor(id: number, date1:Date, date2:Date) {
        this.iD = id;
        this.flyoffDate = date1;
        this.landingDate = date2;
    }
  
}
