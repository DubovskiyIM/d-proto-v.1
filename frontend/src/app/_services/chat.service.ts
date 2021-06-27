import { Injectable } from '@angular/core';
import { IMessages } from '../_interfaces/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private static readonly httpActions = {
    send: 'chat/send',
    set: 'chat/set',
    get: 'auth/get',
  };

  private messages: IMessages[] = [
    {
      id: '2213321',
      data: {
        author: {
          name: 'Cris',
          _id: '60b61a4655abc60079d026d3',
        },
        messages: [
          {
            content: 'Трусы еще в наличии, хорошее ли состояние?',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'Есть ли запах?',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'готов заказать',
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    },
    {
      id: '123123123123',
      data: {
        author: {
          name: 'Cyle',
          _id: '60b61a4655a231279d026d3',
        },
        messages: [
          {
            content: 'К сожалению их уже забрали',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'Но скоро будет поступление',
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    },
  ];
  private dialogs = [
    {
      id: '22',
      messages: this.messages,
    },
    {
      id: '13',
      messages: [],
    },
  ];

  public sendMessage(content: any) {
    this.messages.push({
      id: Math.round(100000).toString(),
      data: {
        author: {
          name: 'Cris',
          _id: '60b61a4655abc60079d026d3',
        },
        messages: [
          {
            content: content.message.value,
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    });
  }

  public getMessagesForChat(chatDialog) {
    const dialog = this.dialogs.find((item) => {
      if (item.id === chatDialog.id) {
        return item;
      }
    });
    return dialog.messages;
  }
}
