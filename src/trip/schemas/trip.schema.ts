import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { AddressTrip } from '../class/addres-trip.class';
import { LocationDto } from '../class/location-reading.class';

export type TripDocument = Trip & Document;

@Schema()
export class Trip { 
    @Prop()
    @ApiProperty({ type: AddressTrip})
    start: AddressTrip;

    @Prop()
    @ApiProperty({ type: AddressTrip})
    end: AddressTrip;

    @Prop()
    @ApiProperty({ example: '1.2'})
    distance: number;

    @Prop()
    @ApiProperty({ example: '36000'})
    duration: number;

    @Prop()
    @ApiProperty({ example: '1'})
    overspeedsCount: number;

    @Prop()
    @ApiProperty({ type: LocationDto})
    boundingBox: LocationDto[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);