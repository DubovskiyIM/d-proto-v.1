import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private static readonly httpActions = {
    send: 'chat/send',
    set: 'chat/set',
    get: 'auth/get',
  };

  constructor() {}

  public sendMessage(content: any) {
    debugger;
    console.log(content.message.value);
  }
}
