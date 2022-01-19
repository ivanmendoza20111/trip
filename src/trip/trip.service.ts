import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripService {

    constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

    async findAll(): Promise<Trip[]> {
        return this.tripModel.find().exec();
    }

    async create(createTripDto: CreateTripDto): Promise<Trip> {
        const createdTrip = new this.tripModel(createTripDto);
        return createdTrip.save();
    }
}
