import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent {
  @Input() conversations = [];

  @Output() onChangedConversation = new EventEmitter<string>();

  constructor() {}

  public selectConversation(conversationId: string) {
    this.onChangedConversation.emit(conversationId);
  }
}
