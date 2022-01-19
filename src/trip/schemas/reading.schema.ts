import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location } from '../class/location-reading.class';

export type ReadingDocument = Reading & Document;

@Schema()
export class Reading {
  @Prop()
  time: number;

  @Prop()
  speed: number;

  @Prop()
  speedLimit: number;

  @Prop()
  location: Location;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);