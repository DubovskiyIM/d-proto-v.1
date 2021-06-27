import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../../_services/chat.service';
import { IMessages } from '../../_interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit, OnChanges, OnInit {
  @ViewChild('footerChat', { read: ElementRef, static: false })
  footerChatView: ElementRef;

  @Input() chatDialog;

  public footerChatHeight;

  public messages: IMessages[];

  public messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getMessages();
  }

  ngAfterViewInit(): void {
    this.footerChatHeight = this.footerChatView.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chatDialog) {
      this.getMessages();
    }
  }

  public sendMessage(): void {
    if (!this.messageForm.controls.message.value) {
      return;
    }
    this.chatService.sendMessage(this.messageForm.controls);
    this.messageForm.reset();
  }

  public getMessages() {
    this.messages = this.chatService.getMessagesForChat(this.chatDialog);
  }
}
