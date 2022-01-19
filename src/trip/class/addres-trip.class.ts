import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = AddressTrip & Document;

@Schema()
export class AddressTrip {
    @Prop()
    time: number;

    @Prop()
    lat: number;

    @Prop()
    lon: number;

    @Prop()
    address?: string;
}


export const AdressSchema = SchemaFactory.createForClass(AddressTrip);