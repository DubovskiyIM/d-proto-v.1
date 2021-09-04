import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit, OnChanges {
  @Input() messages: any[] = [];

  private currentUser;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser.subscribe((res) => {
      this.currentUser = res;
    });
  }

  public isMyMessage(id: number): boolean {
    // debugger;
    if (this.currentUser?._id) {
      // console.log(this.currentUser?._id);
      // console.log(this.messages[id]._id === this.currentUser?._id);
      // debugger;
    }
    return this.messages[id]._id === this.currentUser?._id;
  }

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

  }

  ngOnChanges(changes) {
    // console.log(this.messages);
  }
}
