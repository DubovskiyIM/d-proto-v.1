import { Component, OnInit } from '@angular/core';
import {SocialService} from "../../_services/social.service";

@Component({
  selector: 'app-liked-products',
  templateUrl: './liked-products.component.html',
  styleUrls: ['./liked-products.component.scss']
})
export class LikedProductsComponent implements OnInit {
  public likedProductList = [];
  constructor(private socialService: SocialService) { }

  ngOnInit(): void {
    this.socialService.getLikedProducts().subscribe((res: any) => {
      this.likedProductList = res;
    })
  }

}
