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
  @Output() open: EventEmitter<any> = new EventEmitter();

  // @Output() onChanged = new EventEmitter();
  // change(increased: any) {
  //   this.onChanged.emit(increased);
  // }

  click() {
    this.clicked = true;
    this.open.emit('sdf');
  }
  constructor() {}

  ngOnInit(): void {
  }
}
