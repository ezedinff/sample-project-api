import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";

@Schema({ timestamps: true })
export class Expense extends BaseDocument {
    @Prop({ required: true, type: Number })
    amount: number;
    @Prop({ required: true, type: String })
    reason: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);