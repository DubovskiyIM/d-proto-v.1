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
import { Socket } from 'ngx-socket-io';
import { User } from '../../_interfaces/user';
import { Message } from '../../_interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit, OnChanges, OnInit {
  private activeRoom;
  private user: User;
  private message: Message;
  selected = 'general';

  @ViewChild('footerChat', { read: ElementRef, static: false })
  footerChatView: ElementRef;

  @Input() chatDialog;

  public footerChatHeight;
  public users;

  public messages = [];

  public messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private chatService: ChatService, private socket: Socket) {
  }

  ngOnInit() {
    const activeRoomIdMock = this.chatService.selectedChatUserId;

    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.emit('join', {
      _id: activeRoomIdMock
    });
    this.activeRoom = activeRoomIdMock;

    // TODO Search in base by array of ids
    this.socket.on('onJoin', (user) => {
      this.user = user;
    });

    this.socket.on('message', (messages) => {
      if (!messages) {
        return;
      }
      if (messages.length) {
        this.messages = messages;
      } else {
        this.messages.push(messages);
      }
    });
  }

  receivedMessage(message) {
    this.messages.push({
      type: 'text',
      time: Date.now(),
      content: message
    });
  }

  ngAfterViewInit(): void {
    this.footerChatHeight = this.footerChatView.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  public sendMessage(): void {
    if (!this.messageForm.controls.message.value) {
      return;
    }
    this.socket.emit('message', {
      result: true,
      room: this.activeRoom,
      message: this.messageForm.controls.message.value,
      user: this.user,
      type: 'text',
      date: Date.now()
    });
    this.messageForm.reset();
  }
}
