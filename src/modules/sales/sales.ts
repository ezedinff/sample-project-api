import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";
import { Schema as BaseSchema } from "mongoose";

export interface ISaleItem {
    product: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}
@Schema({ _id: false, timestamps: false })
export class SaleItem extends BaseDocument implements ISaleItem {
    @Prop({ required: true, type: BaseSchema.Types.ObjectId, ref: 'Products' })
    product: string;
    @Prop({ required: true, type: BaseSchema.Types.Number })
    quantity: number;
    @Prop({ required: true, type: BaseSchema.Types.Number })
    unitPrice: number;
    @Prop({ required: true, type: BaseSchema.Types.Number })
    subTotal: number;
}

export const SaleItemSchema = SchemaFactory.createForClass(SaleItem);


@Schema({ timestamps: true })
export class Sale extends BaseDocument {
    @Prop({ type: BaseSchema.Types.ObjectId, ref: 'Users', required: true })
    cashier: string;
    @Prop({ default: [SaleItemSchema] })
    items: ISaleItem[];
    @Prop({ required: true, type: BaseSchema.Types.Number })
    totalPrice: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);