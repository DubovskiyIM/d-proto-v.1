import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() listCards = [];

  @ViewChild('cardItem', { read: ElementRef, static: false })
  cardView: ElementRef;

  private cardHeight;
  size = 'medium';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cardHeight = this.cardView.nativeElement.offsetHeight;
    console.log(this.cardHeight);
  }
}
