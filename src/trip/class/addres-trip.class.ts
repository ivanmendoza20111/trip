import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AddressDocument = AddressTrip & Document;

@Schema()
export class AddressTrip {
    @Prop()
    @ApiProperty({ example: '1642500462000'})
    time: number;

    @Prop()
    @ApiProperty({ example: '-33.580158'})
    lat: number;

    @Prop()
    @ApiProperty({ example: '-70.567227'})
    lon: number;

    @Prop()
    @ApiProperty({ example: 'Ave. Santiago'})
    address?: string;
}


export const AdressSchema = SchemaFactory.createForClass(AddressTrip);