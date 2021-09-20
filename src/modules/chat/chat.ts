import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseDocument from '../../shared/base-document';

export enum MessageType {
  TEXT,
  AUDIO,
}
export class Message {
  senderId: string;
  message: string;
  messageType: MessageType;
  url?: string;
}
export class MessageDTO extends Message {
  chatId: string;
}
@Schema({ timestamps: true })
export class Chat extends BaseDocument {
  @Prop({ required: true })
  receiverId: string;
  @Prop()
  receiverSocket: string;
  @Prop({ required: true })
  senderId: string;
  @Prop()
  senderSocket: string;
  @Prop()
  messages: Array<Message>;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
