import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class LocationDto {
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '-33.580158'})
    lat: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '-70.567227'})
    lon: number;
}