import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {NavigationService} from "../../_services/navigation.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // animations: [
  //   trigger('changeCardImage', [
  //     state(
  //       'initial',
  //       style({
  //         width: '100px',
  //         height: '100px',
  //       })
  //     ),
  //     state(
  //       'final',
  //       style({
  //         width: '200px',
  //         height: '200px',
  //       })
  //     ),
  //     transition('initial=>final', animate('1500ms')),
  //     transition('final=>initial', animate('1000ms')),
  //   ]),
  // ],
})
export class CardComponent implements OnInit {
  @Input() card;
  @Input() isShowHeader = true;
  currentImageCardState = 'initial';


  size = 'medium';

  clicked = false;
  constructor(private navigateService: NavigationService) {
  }
  // @Output() onChanged = new EventEmitter();
  // change(increased: any) {
  //   this.onChanged.emit(increased);
  // }

  public goToProfilePage() {
    this.navigateService.goToProfilePage('22');

  }


  pickCard() {
    this.clicked = true;
  }

  changeStateImageState() {
    this.currentImageCardState = this.currentImageCardState === 'initial' ? 'final' : 'initial';
  }


  ngOnInit(): void {}
}
