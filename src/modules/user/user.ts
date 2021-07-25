import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";
export enum Role {
    CASHIER = "CASHIER",
    MANAGER = "MANAGER"
}


@Schema({ timestamps: true })
export class User extends BaseDocument {
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ enum: Role, default: Role.CASHIER })
    role: Role;
    @Prop({ required: true, unique: true })
    username: string;
    @Prop({ required: true })
    password: string;
    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);