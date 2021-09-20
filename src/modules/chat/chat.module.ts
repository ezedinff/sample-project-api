import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
})
export class ChatModule {}
