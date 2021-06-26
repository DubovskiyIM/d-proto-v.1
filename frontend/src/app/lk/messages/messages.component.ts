import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  // conversations: any;

  // selectedConversation;
  public conversations = [
    {
      id: '22',
      user_name: 'name',
    },
    {
      id: '22',
      user_name: 'name',
    },
    {
      id: '22',
      user_name: 'name',
    },
  ];
  public selectedConversation = this.conversations[0];
  text: string;
  events: Array<any> = [];

  constructor(private router: Router) {}

  buildConversationsArray(conversations) {}

  ngOnInit() {}

  selectConversation(conversationId: string) {}

  sendText(text: string) {}
}
