import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Location } from "../class/location-reading.class";

export class ReadingDto {
    
    @IsNumber()
    @IsNotEmpty()
    time: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Location)
    location: Location;

    @IsNumber()
    @IsNotEmpty()
    speed: number;

    @IsNumber()
    @IsNotEmpty()
    speedLimit: number;
}