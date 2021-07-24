import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";
import { Schema as BaseSchema } from "mongoose";
@Schema({ timestamps: true })
export class Product extends BaseDocument {
    @Prop({ required: true, type: BaseSchema.Types.ObjectId, ref: 'ProductCategories' })
    type: string;
    @Prop({ default: true })
    isAvailable: boolean;
    @Prop({ required: true, type: BaseSchema.Types.Number })
    availableQuantity: number;
    @Prop({ default: 0, type: BaseSchema.Types.Number })
    totalQuantitySold: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);