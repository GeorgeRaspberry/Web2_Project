import { Flight } from './flight'

export class Seat {
    id: number
    flightID: number
    flight: Flight
    order:number
    name:string
    type:number
    constructor(orderr:number)
    {
        this.type = 0
        this.order = orderr
    }
}