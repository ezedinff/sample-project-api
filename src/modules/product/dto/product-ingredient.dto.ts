import { ApiProperty } from "@nestjs/swagger";
import { MeasurementUnit } from "../product-ingredient";

export class ProductIngredientDTO {
    @ApiProperty({ type: String, required: true })
    name: string;
    @ApiProperty({ type: Number, required: true })
    availableInStock: number;
    @ApiProperty({ type: String, enum: MeasurementUnit, required: true })
    measurementUnit: MeasurementUnit;
    @ApiProperty({ type: Number, required: true })
    unitPrice: number;
}