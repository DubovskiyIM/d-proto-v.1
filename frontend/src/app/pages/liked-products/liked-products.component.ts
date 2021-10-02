import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocialService} from "../../_services/social.service";

@Component({
  selector: 'app-liked-products',
  templateUrl: './liked-products.component.html',
  styleUrls: ['./liked-products.component.scss']
})
export class LikedProductsComponent implements OnInit {
  public likedProductList = [];
  public orderIsCardView = true;

  @ViewChild('modalWrapper', {static: false})
  modalCard: ElementRef;

  @ViewChild('fullViewCards', {static: false})
  fullViewCards: any;

  constructor(private socialService: SocialService) { }

  ngOnInit(): void {
    this.socialService.getLikedProducts().subscribe((res: any) => {
      this.likedProductList = res;
    })
  }

  public changeCardView(typeView: string): void {
    console.log(this.orderIsCardView);
    this.orderIsCardView = typeView === 'card' ;
    this.fullViewCards.updateGrid();
  }
}
