import { HttpCode, HttpStatus, UseGuards, UseInterceptors, Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket, Server } from 'socket.io';

import { RedisPropagatorInterceptor } from "@src/shared/redis-propagator/redis-propagator.interceptor";
import { AuthService } from "@src/modules/auth/auth.service";
import { RoomsService } from '@src/modules/rooms/rooms.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway( { namespace: 'rooms' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("ChatGateway");

  connectedUsers: string[] = []

  constructor(
      private authService: AuthService,
      private roomService: RoomsService
  ) {}


  async afterInit(server: any): Promise<void> {
    this.server = server;
    this.logger.log('Initialized.');
  }

  async handleConnection(socket: Socket) {
    const authToken = await AuthService.getAuthToken(socket.handshake.headers.cookie);
    const [ payload, user ] = await this.authService.verify(authToken);

    this.connectedUsers = [...this.connectedUsers, String(payload.userId)];

    this.server.emit('onJoin', user);
    this.server.emit('users', this.connectedUsers);
    this.logger.log('Connection completed.');
  }

  async handleDisconnect(socket: Socket) {
    const authToken = await AuthService.getAuthToken(socket.handshake.headers.cookie);
    const userId = await this.authService.verify(authToken);
    const userPos = this.connectedUsers.indexOf(String(userId));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }

    this.server.emit('users', this.connectedUsers);
    this.logger.log('Connection destroyed.');
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('message')
  async onMessage(client: Socket, result: any) {
    const event: string = 'message';

    await this.roomService.addMessage(result, result.room);
    client.broadcast.to(result.room).emit(event, result);
    this.logger.log('Message saved and emitted.');
    return new Observable(observer =>
        observer.next({ event, data: result })
    );
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, data: any): Promise<any> {
    client.join(data._id);
    const messages = await this.roomService.findMessages(data, 25);
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data: any): void {
    client.leave(data._id);
  }
}
