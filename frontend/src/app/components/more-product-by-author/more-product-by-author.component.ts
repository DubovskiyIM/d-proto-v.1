import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-more-product-by-author',
  templateUrl: './more-product-by-author.component.html',
  styleUrls: ['./more-product-by-author.component.scss']
})
export class MoreProductByAuthorComponent implements OnInit, OnChanges{
  @Input() listCards;

  private showingCards = [];

  private countShowItems = 5;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    console.log('LIST->', this.listCards);
  }

  public getListCards() {
   //  if (!this.showingCards.length) {
   //    for (let i = 0; i < this.countShowItems; i++) {
   //      this.showingCards.push(this.listCards[i])
   //    }
   //  }
   // debugger;
    // return this.showingCards;
  }
}
