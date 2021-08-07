import {
  Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit, OnDestroy {
  @Input() cardImageUrl: string;

  @ViewChild('modalWrapper', { static: false })
  modalCard: ElementRef;

  private eventsSubscription: Subscription;

  @Input() toggleModal: Observable<void>;


  constructor(public dialog: MatDialog) { }

  openDialog() {
    // const dialogRef = this.dialog.open(this.modalCard);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.toggleModal.subscribe(() => {
      console.log('open');
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
