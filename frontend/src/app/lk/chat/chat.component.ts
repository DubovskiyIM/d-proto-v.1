import { Component, OnInit } from '@angular/core';

interface IMessage {
  text: string;
  time: string;
  author: {
    userId?: string;
    name: string;
  };
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  selectedConversation = {
    user_name: 'Carl',
  };

  messages: IMessage[] = [];

  constructor() {}

  ngOnInit(): void {
    this.messages.push({
      text: '',
      time: '10:23',
      author: {
        name: 'Ignat Dubovsky',
      },
    });
  }
}
