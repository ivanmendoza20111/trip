import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { LocationDto } from "../class/location-reading.class";

export class ReadingDto {
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1642500462000'})
    time: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Location)
    @ApiProperty({ type: LocationDto})
    location: LocationDto;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '9'})
    speed: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '38'})
    speedLimit: number;
}