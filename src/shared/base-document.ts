import { Document } from 'mongoose';
export default class BaseDocument extends Document {
    createdAt: string;
    updatedAt: string;
}