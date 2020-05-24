export class Test {
    id: number;
    Name: string;

    constructor(id: number, company: string)
    {
        this.id = id;
        this.Name = company;
    }
    CreateTest(Id: number, Name: string) {
        this.id = Id;
        this.Name = Name;
    }

}

