import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card;
  public showingImageSrc: string;

  constructor() {}

  ngOnInit(): void {
    this.showingImageSrc = this.card.images.defaultOrderImage;
  }

  public onMouseCardOver(): void {
    this.showingImageSrc = this.card.images.secondOrderImage;
  }

  public onMouseCardOut(): void {
    this.showingImageSrc = this.card.images.defaultOrderImage;
  }
}
