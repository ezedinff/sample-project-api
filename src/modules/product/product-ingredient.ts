import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Schema as BaseSchema } from "mongoose";
import BaseDocument from "src/shared/base-document";
export enum MeasurementUnit {
    KG = "KG",
    GRAM = "GRAM",
    LITER = "LITER"
}
@Schema({ timestamps: true })
export class ProductIngredient extends BaseDocument {
    @Prop({ required: true })
    name: string;
    @Prop({ default: 0, type: BaseSchema.Types.Number })
    availableInStock: number;
    @Prop({ required: true, enum: MeasurementUnit })
    measurementUnit: MeasurementUnit;
    @Prop({ required: true, type: BaseSchema.Types.Number })
    unitPrice: number;
}

export const ProductIngredientSchema = SchemaFactory.createForClass(ProductIngredient);