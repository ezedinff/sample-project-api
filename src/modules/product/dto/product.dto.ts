import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
    @ApiProperty({ type: String, required: true })
    name: string;
    @ApiProperty({ type: Number, required: true })
    price: number;
    @ApiProperty({ type: [String], required: true, description: 'List of product ingredient Ids' })
    ingredient: string[];
    @ApiProperty({ type: Number, required: true })
    expiresAfterDays: number;
    @ApiProperty({ type: String, required: true })
    type: string;
    @ApiProperty({ type: Number, required: true })
    quantity: number;
}
