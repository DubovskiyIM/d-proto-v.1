import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../_services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public conversations = [];
  public selectedChatDialog;

  constructor(private router: Router, private chatService: ChatService) {}

  public changeChatDialog(chatDialogId: string) {
    this.conversations.find((item) => {
      if (item.id === chatDialogId) {
        this.selectedChatDialog = item;
      }
    });
  }

  ngOnInit() {
    this.chatService.getRooms().subscribe(rooms => {
      this.conversations = rooms;
      this.selectedChatDialog = this.conversations[0];
    });
  }
}
