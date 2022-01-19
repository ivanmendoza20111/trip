import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {

    constructor(
        private readonly tripService: TripService,
    ) {}

    @Get()
    async findAll(): Promise<Trip[]> {
        return this.tripService.findAll();
    }

    @Post()
    async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
        return this.tripService.create(createTripDto);
    }
}
