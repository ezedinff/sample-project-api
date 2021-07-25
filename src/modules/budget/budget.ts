import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";

@Schema({timestamps: true})
export class Budget extends BaseDocument {
    @Prop({type: Number, required: true})
    amount: number;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);