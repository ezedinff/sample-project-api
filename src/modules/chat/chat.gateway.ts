import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`disconnecting... socket id:`, socketId);
  }

  @SubscribeMessage('participants')
  async onParticipant(socket: Socket, participant: any) {
    console.log(socket, participant);
    // TODO: create a new conversation
    // TODO: return conversation with a message
  }

  @SubscribeMessage('exchanges')
  async onMessage(socket: Socket, message: string) {
    console.log(socket, message);
  }
}
