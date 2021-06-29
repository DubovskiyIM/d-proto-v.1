import { Injectable } from '@angular/core';
import { Message } from '../_interfaces/chat';
import { Observable } from 'rxjs';
import { Room } from '../_interfaces/chat';
import { User } from '../_interfaces/user';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public constructor(private socket: Socket) {
  }

  public sendMessage(text: string, name: string, roomId: string): void {
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('sendMessage');
  }

  public joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  public getRooms(): Observable<Room> {
    return this.socket.fromEvent<Room>('updatedRooms');
  }

  public addRoom(roomName: string): void {
    this.socket.emit('addroom', roomName);
  }

  public getUsers(): Observable<User[]> {
    return this.socket.fromEvent<User[]>('usersRoom');
  }
}
