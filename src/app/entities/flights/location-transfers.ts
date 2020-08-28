import { Flight } from './flight'
import { Location } from './location'
import { RideCompany } from '../rides/ride-company'

export class LocationTransfers {
    id:number
    flightID:number
    flight:Flight
    locationID:number
    location:Location
    status: number

    constructor(){
        
    }    
}

export class RideLocationTransfers {
    id:number
    rideCompanyID:number
    rideCompany:RideCompany
    locationID:number
    location:Location
    status: number

    constructor(){
        
    }    
}
