import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  // TODO: get conversations with userid
  // TODO: create new conversation

  constructor(private readonly chatService: ChatService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async chats(@Req() req) {
    return await this.chatService.getChats(req.user._id);
  }
}
