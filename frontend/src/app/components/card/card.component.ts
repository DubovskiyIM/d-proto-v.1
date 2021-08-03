import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card;

  size = 'medium';

  clicked = false;

  // @Output() onChanged = new EventEmitter();
  // change(increased: any) {
  //   this.onChanged.emit(increased);
  // }

  pickCard() {
    this.clicked = true;
  }
  constructor() {}

  ngOnInit(): void {
  }
}
