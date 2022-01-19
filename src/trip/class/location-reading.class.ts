import { IsNotEmpty, IsNumber } from "class-validator";

export class Location {
    
    @IsNumber()
    @IsNotEmpty()
    lat: number;
    
    @IsNumber()
    @IsNotEmpty()
    lon: number;
}