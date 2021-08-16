import {
  Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Observable, Subscription} from "rxjs";
import {ModalDismissReasons, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {

  closeModal: string;

  constructor(private modalService: NgbModal) {}

  triggerModal() {
    const content = this.modalCard;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  @Input() card;
  //
  @ViewChild('modalWrapper', { static: false })
  modalCard: ElementRef;
  //
  // private eventsSubscription: Subscription;
  //
  ngOnInit() {

    console.log(this.card);
  }

  // @Input() toggleModal: Observable<void>;
  // closeModal: string;
  //
  // constructor(private modalService: NgbModal) {}
  //
  // triggerModal() {
  //   this.modalService.open(this.modalCard, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
  //     this.closeModal = `Closed with: ${res}`;
  //   }, (res) => {
  //     this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  //   });
  // }
  //
  // getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
