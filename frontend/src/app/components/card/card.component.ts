import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { NavigationService } from '../../_services/navigation.service';
import {Subject} from "rxjs";

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

  isShortView = true;

  @Input() isProfilePage = true;

  showSocialButtons = false;

  currentImageCardState = 'initial';

  openModalSubj: Subject<void> = new Subject<void>();

  size = 'medium';

  clicked = false;

  constructor(private navigateService: NavigationService) {
  }

  @Output() updateGrid = new EventEmitter();

  openModal() {

    // this.isShortView = false;
    // this.updateGrid.emit();
  }

  public goToProfilePage() {
    this.navigateService.goToProfilePage('22');
  }

  pickCard() {
    this.clicked = true;
  }

  addFavoriteProduct() {
  }

  clickOpenModalView() {
    this.openModalSubj.next();
    // this.openModal();
    // this.isShortView = false;
  }

  goToProductPage() {
    this.navigateService.goToProductPage(this.card.id);
  }

  changeMouseOverSate() {
    this.showSocialButtons = true;
    this.currentImageCardState = this.currentImageCardState === 'initial' ? 'final' : 'initial';
  }

  leaveMouseSate() {
    this.showSocialButtons = false;
  }

  ngOnInit(): void {}
}
