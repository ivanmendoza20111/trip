import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { ReadingDto } from "./reading.dto";

export class ReadingsDto {
    
    @IsArray()
    @ArrayNotEmpty()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ReadingDto)
    @ApiProperty({ type: ReadingDto, isArray: true })
    readings: ReadingDto[];
}