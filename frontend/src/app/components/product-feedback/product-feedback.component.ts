import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-feedback',
  templateUrl: './product-feedback.component.html',
  styleUrls: ['./product-feedback.component.scss']
})
export class ProductFeedbackComponent implements OnInit, OnChanges {
  @Input() feedbacks = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.feedbacks);
  }

  goToProfilePage() {
  }
}
