import { HttpCode, HttpStatus, UseGuards, UseInterceptors, Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket, Server } from 'socket.io';

import { RedisPropagatorInterceptor } from "@src/shared/redis-propagator/redis-propagator.interceptor";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AuthService } from "@src/modules/auth/auth.service";
import { RoomsService } from '@src/modules/rooms/rooms.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("ChatGateway");

  connectedUsers: string[] = []

  constructor(
      private authService: AuthService,
      private roomService: RoomsService
  ) {}

  async handleConnection(socket: Socket) {
    const authToken = socket.handshake.headers.authorization;
    const userId = await this.authService.verify(authToken);

    this.connectedUsers = [...this.connectedUsers, String(userId)];

    this.logger.log("Initialized");
    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket: Socket) {
    const authToken = socket.handshake.headers.authorization;
    const userId = await this.authService.verify(authToken);
    const userPos = this.connectedUsers.indexOf(String(userId));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }

    this.server.emit('users', this.connectedUsers);
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('message')
  async onMessage(client: Socket, data: any) {
    console.log(data);
    const event: string = 'message';
    const result = data[0];

    await this.roomService.addMessage(result.message, result.room);
    client.broadcast.to(result.room).emit(event, result.message);

    return new Observable(observer =>
        observer.next({ event, data: result.message })
    );
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, data: any): Promise<any> {
    client.join(data[0]);

    const messages = await this.roomService.findMessages(data, 25);

    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data: any): void {
    client.leave(data[0]);
  }
}
