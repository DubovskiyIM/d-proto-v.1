import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

import { JwtService } from '@nestjs/jwt';
import { User } from '../../types/user';
import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway(1080, { namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  connectedUsers: string[] = [];

  constructor(
      private jwtService: JwtService,
      private roomService: RoomsService
  ) {}

  async handleConnection(socket) {
    const user: User = await this.jwtService.verify(
        socket.handshake.query.token
    );

    this.connectedUsers = [...this.connectedUsers, String(user._id)];

    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket) {
    const user: User = await this.jwtService.verify(
        socket.handshake.query.token
    );
    const userPos = this.connectedUsers.indexOf(String(user._id));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }

    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('message')
  async onMessage(client, data: any) {
    const event: string = 'message';
    const result = data[0];

    await this.roomService.addMessage(result.message, result.room);
    client.broadcast.to(result.room).emit(event, result.message);

    return Observable.create(observer =>
        observer.next({ event, data: result.message })
    );
  }

  @SubscribeMessage('join')
  async onRoomJoin(client, data: any): Promise<any> {
    client.join(data[0]);

    const messages = await this.roomService.findMessages(data, 25);

    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data: any): void {
    client.leave(data[0]);
  }
}
