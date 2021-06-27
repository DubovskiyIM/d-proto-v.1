import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public conversations = [
    {
      id: '22',
      user_name: 'Carl',
    },
    {
      id: '13',
      user_name: 'name',
    },
    {
      id: '44',
      user_name: 'name',
    },
  ];
  public selectedChatDialog = this.conversations[0];

  constructor(private router: Router) {}

  public changeChatDialog(chatDialogId: string) {
    this.conversations.find((item) => {
      if (item.id === chatDialogId) {
        this.selectedChatDialog = item;
      }
    });
  }

  ngOnInit() {}
}
