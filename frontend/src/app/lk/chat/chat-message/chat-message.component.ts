import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() messages: any[] = [];

  private currentUser;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser.subscribe((res) => {
      this.currentUser = res;
    });
  }

  // public isMyMessage(id: number): boolean {
  //   return this.messages[id]?.data?.author?._id === this.currentUser?._id;
  // }

  public isLastMessageInGroup(
    indexGroup: number,
    indexMessage: number
  ): boolean {
    const currentMessages = this.messages[indexGroup]?.data.messages;
    return (
      currentMessages.indexOf(currentMessages[indexMessage]) + 1 ===
      currentMessages.length
    );
  }

  ngOnInit(): void {
    console.log(this.messages);
  }
}
