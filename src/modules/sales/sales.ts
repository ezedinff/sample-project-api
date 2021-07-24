import { Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";

@Schema({ timestamps: true })
export class Sale extends BaseDocument {
    cashier: string;
    items: {
        product: string;
        quantity: number;
        unitPrice: number;
        subTotal: number;
    }[];
    totalPrice: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);