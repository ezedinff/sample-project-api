import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseDocument from 'src/shared/base-document';
export enum UserRole {
  ADMIN,
  USER,
}

export enum Gender {
  MALE,
  FEMALE,
}

export class Address {
  country!: string;
  city!: string;
}

@Schema({ timestamps: true })
export class User extends BaseDocument {
  @Prop({ required: true })
  firstName!: string;
  @Prop({ required: true })
  lastName!: string;
  @Prop({ required: true, unique: true })
  email!: string;
  @Prop({ default: UserRole.USER })
  role!: UserRole;
  @Prop({})
  birthDate!: Date;
  @Prop({ required: true })
  password!: string;
  @Prop({ type: Gender, required: true })
  gender!: Gender;
  @Prop()
  address?: Address; // optional
  @Prop()
  photo?: string; // optional
  @Prop({ default: [] })
  friends?: Array<string>; // id
  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
