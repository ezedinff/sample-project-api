import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import BaseDocument from "src/shared/base-document";

@Schema({ timestamps: true })
export class User extends BaseDocument {
    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);