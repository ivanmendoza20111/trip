import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { ReadingDto } from './dto/reading.dto';
import { ReadingsDto } from './dto/readings.dto';
import { Location } from './class/location-reading.class';
import { time } from 'console';
import { FilterParams } from './class/params.class';

@Injectable()
export class TripService {

    constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

    async findAll(params: FilterParams): Promise<Trip[]> {
        const { start_gte, start_lte, distance_gt } = params;
        const limit = params.limit || 20;
        const offset = params.offset || 0;

        const query = this.tripModel.find().sort({ _id: 1});
        
        if(start_gte) {
            query.where( { 'start.time': { $gte: start_gte } } );
        }

        if(start_lte) {
            query.where( { 'start.time': { $lte: start_lte }} );
        }

        if(distance_gt) {
            query.where( { distance: { $gt: distance_gt } });
        }

        if(limit) {
            query.limit(limit);
        }

        if(offset) {
            query.skip(offset);
        }

        return await query.exec();
    }

    async create(readingsDto: ReadingsDto): Promise<Trip> {
        
        if(readingsDto.readings.length < 5) {
            throw new BadRequestException("Debe enviar por lo menos 5 Readings para la creación del viaje!!");
        }

        const start: ReadingDto = Object.entries(readingsDto.readings).reduce( (prev, curr) => {
            return prev[1].time < curr[1].time ? prev : curr;
        })[1];

        const end: ReadingDto = Object.entries(readingsDto.readings).reduce( (prev, curr) => {
            return prev[1].time > curr[1].time ? prev : curr;
        })[1];

        let duration: number = end.time - start.time;

        // conseguir address a traves de un api con la lat y longitud
        // calculo de la distancia 
        let distance: number = 0;

        let overspeedsCount: number = 0;
        readingsDto.readings.forEach((r) => { if(r.speed > r.speedLimit) { overspeedsCount++; } });
        const boundingBox: Location[] = readingsDto.readings.map(r => r.location);
        
        const createTripDto = new CreateTripDto();
        createTripDto.start = { time: start.time, lat: start.location.lat, lon: start.location.lon, address: '' };
        createTripDto.end = { time: end.time, lat: end.location.lat, lon: end.location.lon, address: '' };;
        createTripDto.distance = distance;
        createTripDto.duration = duration;
        createTripDto.overspeedsCount = overspeedsCount;
        createTripDto.boundingBox = boundingBox;

        return await new this.tripModel(createTripDto).save();
    }
}
