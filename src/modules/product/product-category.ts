import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Schema as BaseSchema } from "mongoose";
import BaseDocument from "src/shared/base-document";
@Schema({ timestamps: true })
export class ProductCategory extends BaseDocument {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true, type: Number, default: 0.0 })
    price: number;
    @Prop({ default: [], type: [BaseSchema.Types.ObjectId], ref: "ProductIngredients" })
    ingredient: [];
    @Prop({ default: 1 })
    expiresAfterDays: number;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);