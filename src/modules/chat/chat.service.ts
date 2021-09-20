import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class ChatService extends BaseService<Chat> {
  constructor(@InjectModel(Chat.name) protected chatModel: Model<Chat>) {
    super();
    this._model = chatModel;
  }
  async getChats(userId: string) {
    return this.chatModel.find({
      $or: [{ receiverId: userId }, { senderId: userId }],
    });
  }
}
