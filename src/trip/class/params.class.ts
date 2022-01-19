import { ApiProperty } from "@nestjs/swagger";

export class FilterParams {
    @ApiProperty({ example: '1642500462000', required: false })
    start_gte: number;

    @ApiProperty({ example: '1642500498000', required: false })
    start_lte: number;

    @ApiProperty({ example: '0', required: false })
    distance_gt: number;

    @ApiProperty({ example: '20', required: false })
    limit: number;

    @ApiProperty({ example: '0', required: false })
    offset: number;
}