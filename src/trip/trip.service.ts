import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { ReadingDto } from './dto/reading.dto';
import { ReadingsDto } from './dto/readings.dto';
import { LocationDto } from './class/location-reading.class';
import { FilterParams } from './class/params.class';
import { Address } from './dto/address.dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class TripService {

    constructor(
        @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
        private httpService: HttpService
    ) {}

    /**
     * Get all Trips
     * @param params FilterParams
     * @returns Promise<Trip[]>
     */
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

    /**
     * Create a Trip
     * @param readingsDto: ReadingsDto
     * @returns Promise<Trip>
     */
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

        // calculo de la distancia 
        let distance: number = this.getKilometros(start.location.lat, start.location.lon, end.location.lat, end.location.lon);

        let overspeedsCount: number = 0;
        readingsDto.readings.forEach((r) => { if(r.speed > r.speedLimit) { overspeedsCount++; } });

        // BoudingBox
        const BoundingBox = require('boundingbox');
        const bbox = new BoundingBox({minlat: start.location.lat, minlon: start.location.lon, maxlat: end.location.lat, maxlon: end.location.lon});
        
        // get Address
        const startAddress = await this.getAddress(start.location.lat, start.location.lon);
        const endAddress = await this.getAddress(end.location.lat, end.location.lon);
        
        const createTripDto = new CreateTripDto();
        createTripDto.start = { time: start.time, lat: start.location.lat, lon: start.location.lon, address: startAddress.display_name };
        createTripDto.end = { time: end.time, lat: end.location.lat, lon: end.location.lon, address: endAddress.display_name };
        createTripDto.distance = distance;
        createTripDto.duration = duration;
        createTripDto.overspeedsCount = overspeedsCount;

        // get boundingBox
        createTripDto.boundingBox = bbox.toGeoJSON().geometry.coordinates;;
        
        return await new this.tripModel(createTripDto).save();
    }

    /**
     * Return info Address
     * @param lat number
     * @param lon number
     * @returns Promise<Address>
     */
    async getAddress(lat: number, lon: number): Promise<Address> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&&lon=${lon}`;
        return await this.httpService
            .get(url)
            .pipe(map((res) => res.data))
            .toPromise()
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Calcular Kilometros
     */
    getKilometros(lat1: number,lon1: number,lat2: number,lon2: number): any {
        const rad = function(x) {return x*Math.PI/180;}
        let R = 6378.137; //Radio de la tierra en km
        let dLat = rad( lat2 - lat1 );
        let dLong = rad( lon2 - lon1 );
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return parseFloat(d.toFixed(3)); //Retorna tres decimales
    }
}
