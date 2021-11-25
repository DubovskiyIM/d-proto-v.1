import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-feedbacks-list',
  templateUrl: './product-feedbacks-list.component.html',
  styleUrls: ['./product-feedbacks-list.component.scss']
})
export class ProductFeedbacksListComponent implements OnInit, OnChanges {
  @Input() feedbacks = [];
  @Input() isShowPurchasedItem: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log('FEEDBACK', this.feedbacks);
  }

  goToProfilePage(userId: string) {

  }

  ngOnChanges() {
    console.log('FEEDBACK', this.feedbacks);
  }
}
