import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @Input() conversations = [];

  @Output() changeConversation = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  public selectConversation(conversationId: string) {
    this.changeConversation.emit(conversationId);
  }

  ngOnInit() {
  }
}
