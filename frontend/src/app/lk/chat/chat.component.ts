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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit, OnChanges, OnInit {
  private activeRoom = '';
  selected = 'general';

  private rooms = {
    general: false,
    roomA: false,
    roomB: false,
    roomC: false,
    roomD: false,
  };
  private listRooms = [
    'general',
    'roomA',
    'roomB',
    'roomC',
    'roomD'
  ];

  @ViewChild('footerChat', { read: ElementRef, static: false })
  footerChatView: ElementRef;

  @Input() chatDialog;

  public footerChatHeight;

  public messages = [];

  public messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private chatService: ChatService, private socket: Socket) {
  }

  ngOnInit() {
    // this.getMessages();
    this.activeRoom = this.selected;

    this.socket.on('connect', () => {
      this.check();
    });

    this.socket.on('joinedRoom', (room) => {
      this.rooms[room] = true;
    });

    this.socket.on('leftRoom', (room) => {
      this.rooms[room] = false;
    });

    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  }

  receivedMessage(message) {
    this.messages.push({
      type: 'text',
      time: Date.now(),
      content: message
    });
    console.log(this.messages);
  }

  check() {
    if (!this.isMemberOfActiveRoom) {
      this.socket.emit('leaveRoom', this.activeRoom);
    } else {
      this.socket.emit('joinRoom', this.activeRoom);
    }
  }

  isMemberOfActiveRoom() {
    return this.rooms[this.activeRoom];
  }

  ngAfterViewInit(): void {
    this.footerChatHeight = this.footerChatView.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.chatDialog) {
    //   this.getMessages();
    // }
  }

  public sendMessage(): void {
    if (!this.messageForm.controls.message.value) {
      return;
    }
    this.chatService.sendMessage(this.messageForm.controls);
    this.messageForm.reset();
  }
  //
  // public getMessages() {
  //   this.messages = this.chatService.getMessagesForChat(this.chatDialog);
  // }
}
