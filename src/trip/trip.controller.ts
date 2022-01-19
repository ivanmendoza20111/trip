import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FilterParams } from './class/params.class';
import { ReadingDto } from './dto/reading.dto';
import { ReadingsDto } from './dto/readings.dto';
import { Trip } from './schemas/trip.schema';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {

    constructor(
        private readonly tripService: TripService,
    ) {}

    @Get()
    async findAll(@Query() query: FilterParams): Promise<Trip[]> {
        return this.tripService.findAll(query);
    }

    @Post()
    async create(@Body() readingsDto: ReadingsDto): Promise<Trip> {
        return this.tripService.create(readingsDto);
    }
}
