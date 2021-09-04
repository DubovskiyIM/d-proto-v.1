import {
  Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from "rxjs";
import {SwiperOptions} from 'swiper';
import {ModalDismissReasons, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../_services/user.service";
import {NavigationService} from '../../../_services/navigation.service'
import {ChatService} from "../../../_services/chat.service";
import {eventListeners} from "@popperjs/core";
import {NotifyComponent} from "../../notify/notify.component";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  @Input() card;
  @Input() isHomePage;


  @ViewChild('modalWrapper', {static: false})
  modalCard: ElementRef;

  @ViewChild(NotifyComponent, {static: false})
  notify;

  closeModal: string;
  config: SwiperOptions = {
    pagination: {
      type: 'progressbar',
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private navigateService: NavigationService,
              private chatService: ChatService,
              private clipboardService: ClipboardService) {
  }

  ngOnInit() {
    console.log(this.card);
  }

  triggerModal(event?: Event) {
    const content = this.modalCard;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

    if (event) {
      event.stopPropagation();
    }

  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public goToProductPage() {
    this.navigateService.goToProductPage(this.card._id)
    this.closeOpenedModal();
  }

  public openChat() {
    this.userService.openChatByUser(this.card?.owner).subscribe((res: any) => {
      this.chatService.selectedChatUserId = res?._id;
      this.navigateService.goToChatPage(this.card?.owner);
    })
    this.closeOpenedModal();
  }

  public closeOpenedModal() {
    this.modalService.dismissAll();
  }

  public copyLink() {
    const location = window.location.href + 'product/' + this.card._id;
    this.clipboardService.copyFromContent(location);
    this.notify.openSnackBar()
  }


}
