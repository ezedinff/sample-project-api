import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
    @ApiProperty({ type: String, required: true })
    name: string;
    @ApiProperty({ type: Number, required: true })
    price: number;
    @ApiProperty({ type: [String], required: true, description: 'List of product ingredient Ids' })
    ingredients: string[];
    @ApiProperty({ type: Number, required: true })
    expiresAfterDays: number;
    @ApiProperty({ type: Number, required: true })
    quantity: number;
}
