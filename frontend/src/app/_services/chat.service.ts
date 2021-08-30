import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public selectedChatUserId;
  private static readonly httpActions = {
    send: 'chat/send',
    set: 'chat/set',
    get: 'auth/get',
    rooms: 'rooms'
  };

  constructor(private socket: Socket, private http: HttpClient, @Inject(APP_BASE_HREF) private baseUrl: string) {
    this.baseUrl = 'api' + this.baseUrl;
  }


  sendMessage(body) {
    this.socket.emit('message', body.message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data) => data));
  }

  public getRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}${ChatService.httpActions.rooms}`);
  }
}
