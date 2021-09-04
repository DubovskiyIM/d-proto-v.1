import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ChatService } from '../../_services/chat.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public conversations = [];
  public selectedChatDialog;
  private selectedUserId;

  constructor(private router: Router, private chatService: ChatService, private route: ActivatedRoute,) {}

  public changeChatDialog(chatDialogId: string) {
    this.conversations.find((item) => {
      if (item._id === chatDialogId) {
        this.selectedChatDialog = item;
        this.chatService.getMessage().subscribe((messages) => {
          console.log(messages);
        })
        console.log('SELECTED DIALOG ->', this.selectedChatDialog);
      }
    });
  }

  ngOnInit() {
    this.chatService.getRooms().subscribe((rooms) => {
      this.conversations = rooms;
      this.selectedChatDialog = this.conversations[0];
    });
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    )
      .subscribe((data) => {
        this.selectedUserId = data;
        // console.log(data);
        // this.product = this.productService.getProductById(this.productId);
        // console.log(this.product);
      });
  }
}
