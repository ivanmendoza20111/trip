import { AddressTrip } from "../class/addres-trip.class";
import { Location } from "../class/location-reading.class";

export class CreateTripDto {
    start: AddressTrip;
    end: AddressTrip;
    distance: number;
    duration: number;
    overspeedsCount: number;
    boundingBox: Location[];
}