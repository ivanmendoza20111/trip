import { AddressTrip } from "../class/addres-trip.class";
import { LocationDto } from "../class/location-reading.class";

export class CreateTripDto {
    start: AddressTrip;
    end: AddressTrip;
    distance: number;
    duration: number;
    overspeedsCount: number;
    boundingBox: LocationDto[];
}