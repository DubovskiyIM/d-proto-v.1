import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NavigationService} from "../../_services/navigation.service";

@Component({
  selector: 'app-feedback-modal-view',
  templateUrl: './feedback-modal-view.component.html',
  styleUrls: ['./feedback-modal-view.component.scss'],
})
export class FeedbackModalViewComponent implements OnInit {
  @ViewChild('modalWrapper', {static: false})
  modalCard: ElementRef;
  closeModal: string;

  constructor(private modalService: NgbModal, private navigateService: NavigationService) { }

  ngOnInit(): void {
  }

  public closeOpenedModal() {
    this.modalService.dismissAll();
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

  public goToProfilePage(): void {
     this.navigateService.goToProfilePage('22');
  }

}
