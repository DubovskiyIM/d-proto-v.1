import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-orders-cards',
  templateUrl: './history-orders-cards.component.html',
  styleUrls: ['./history-orders-cards.component.scss']
})
export class HistoryOrdersCardsComponent implements OnInit {
  @Input() historyOrdersList = [];
  constructor() { }

  ngOnInit(): void {
  }

}
