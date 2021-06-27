import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../_services/chat.service';
import { IMessages } from '../../_interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('footerChat', { read: ElementRef, static: false })
  footerChatView: ElementRef;
  public footerChatHeight;
  selectedConversation = {
    user_name: 'Carl',
  };

  public messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  public messages: IMessages[] = [
    {
      id: '2213321',
      data: {
        author: {
          name: 'Cris',
          _id: '60b61a4655abc60079d026d3',
        },
        messages: [
          {
            content: 'Трусы еще в наличии, хорошее ли состояние?',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'Есть ли запах?',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'готов заказать',
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    },
    {
      id: '123123123123',
      data: {
        author: {
          name: 'Cyle',
          _id: '60b61a4655a231279d026d3',
        },
        messages: [
          {
            content: 'К сожалению их уже забрали',
            time: Date.now(),
            type: 'text',
          },
          {
            content: 'Но скоро будет поступление',
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    },
  ];

  constructor(private chatService: ChatService) {}

  ngAfterViewInit(): void {
    this.footerChatHeight = this.footerChatView.nativeElement.offsetHeight;
    console.log(this.footerChatHeight);
  }

  public sendMessage(): void {
    if (!this.messageForm.controls.message.value) {
      return;
    }
    this.chatService.sendMessage(this.messageForm.controls);
    this.messages.push({
      id: Math.round(100000).toString(),
      data: {
        author: {
          name: 'Cris',
          _id: '60b61a4655abc60079d026d3',
        },
        messages: [
          {
            content: this.messageForm.controls.message.value,
            time: Date.now(),
            type: 'text',
          },
        ],
      },
    });
    this.messageForm.reset();
  }
}
