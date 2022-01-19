import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { FilterParams } from './class/params.class';
import { ReadingsDto } from './dto/readings.dto';
import { Trip } from './schemas/trip.schema';
import { TripService } from './trip.service';

@Controller('trip')
@ApiTags('trip')
export class TripController {

    constructor(
        private readonly tripService: TripService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener una lista de viajes' })
    @ApiResponse({
        status: 200,
        description:
          'Lista de Trip obtenida satisfactoriamente',
        type: Trip,
        isArray: true,
    })
    async findAll(@Query() query: FilterParams): Promise<Trip[]> {
        return this.tripService.findAll(query);
    }

    @Post()
    @ApiOperation({ summary: 'Guardar un viaje con Readings' })
    @ApiResponse({
        status: 201,
        description:
          'Se creo un Trip de manera satisfactoria.',
        type: Trip,
    })
    @ApiBadRequestResponse({
        status: 400,
        description:
          'Error al procesar los datos, pueden faltar algunos datos.',
    })
    async create(@Body() readingsDto: ReadingsDto): Promise<Trip> {
        return this.tripService.create(readingsDto);
    }
}
