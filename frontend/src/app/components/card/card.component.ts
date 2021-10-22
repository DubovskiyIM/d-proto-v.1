import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import {NavigationService} from '../../_services/navigation.service';
import {CardModalComponent} from "./card-modal/card-modal.component";
import {Subject} from "rxjs";
import {SocialService} from "../../_services/social.service";
import {getImageUrl} from '../../_helpers/file-helper'
import {ProductService} from "../../_services/product.service";
import {TuiMobileDialogService} from "@taiga-ui/addon-mobile";
import {PromptService} from "../dialog-prompt/dialog-prompt.component";
import {AuthenticationService} from "../../_services/authentication.service";

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
  @Input() isHomePage = false;
  @Input() isProfilePage = true
  @Input() isCardView = false;

  @Output() updateGrid = new EventEmitter();

  isFavoriteCard = false;
  showSocialButtons = false;
  currentImageCardState = 'initial';

  openModalSubj: Subject<void> = new Subject<void>();

  size = 'medium';

  clicked = false;

  constructor(private navigateService: NavigationService,
              private socialService: SocialService,
              private authenticationService: AuthenticationService,
              private productService: ProductService,
              private dialogsService: TuiMobileDialogService,
              private promptService: PromptService
              ) {
  }
  ngOnInit(): void {
    // debugger;
    this.isFavoriteCard  = this.card.likes.includes(this.authenticationService.getCurrentUserPropertyValue('_id'));
  }


  public goToProfilePage() {
    this.navigateService.goToProfilePage(this.card?.owner);
  }

  pickCard() {
    this.clicked = true;
  }

  favoriteProduct(event) {
    event.stopPropagation();
    // this.isFavoriteCard = !this.isFavoriteCard;
    if (this.isFavoriteCard) {
      this.socialService.unlikeProduct(this.card._id).subscribe((res) => {
        this.isFavoriteCard = false;
      })
      return;
    }

    this.socialService.likeProduct(this.card._id).subscribe((res) => {
      this.isFavoriteCard = true;
      // console.log(res);
    })

  }

    deleteProduct(event) {
    event.stopPropagation();
    this.promptService
        .open(
          'Text',
        )
        .subscribe(index => {
          // Index of clicked button
          console.log(index);
        });

    // debugger;
    // this.productService.deleteProductById(this.card._id).subscribe((res) => {
    //   console.log(res);
    // })
  }

  clickOpenModalView() {
    // this.CardModalComponent.openModal();
    // this.openModalSubj.next();
    // this.openModal();
    // this.isShortView = false;
  }

  goToProductPage() {
    if (this.card._id) {
      this.navigateService.goToProductPage(this.card._id);
    }
  }

  changeMouseOverSate() {
    this.showSocialButtons = true;
    this.currentImageCardState = this.currentImageCardState === 'initial' ? 'final' : 'initial';
  }

  leaveMouseSate() {
    this.showSocialButtons = false;
  }



  getImageHref(url: string): string {

    // console.log('IMAGE HREF ->', this.card.images[0]);
    // debugger;
    if (url) {
      // console.log(getImageUrl(url));
      // debugger;
      return getImageUrl(url);
    }
  }
}
