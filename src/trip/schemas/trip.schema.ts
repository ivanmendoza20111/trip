import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressTrip } from '../class/addres-trip.class';
import { Location } from '../class/location-reading.class';

export type TripDocument = Trip & Document;

@Schema()
export class Trip { 
    @Prop()
    start: AddressTrip;

    @Prop()
    end: AddressTrip;

    @Prop()
    distance: number;

    @Prop()
    duration: number;

    @Prop()
    overspeedsCount: number;

    @Prop()
    boundingBox: Location[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);