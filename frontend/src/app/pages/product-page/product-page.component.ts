import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../_services/product.service";
import SwiperCore, { Navigation, Thumbs } from "swiper"
import {NavigationService} from "../../_services/navigation.service";
import {SocialService} from "../../_services/social.service";

SwiperCore.use([Navigation, Thumbs]);
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  private productId: string | undefined;
  public product;
  public recommendedProductList = [];
  private subscription: Subscription;
  public productFeedbackList = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private navigateService: NavigationService,
              private socialService: SocialService
              ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    )
      .subscribe((data) => {
        this.productId = data;

        this.productService.getProductById(this.productId).subscribe((product) => {
          this.product = product;
          console.log('PRODUCT', this.product);
        });
      });

    this.productService.getProductsList().subscribe((res: any) => {
      this.recommendedProductList = res;
    });

    this.productFeedbackList = this.socialService.getProductFeedbacks();
  }

  goToProfilePage() {
    this.navigateService.goToProfilePage(this.product?.owner);
  }

  public copyLink() {
    this.socialService.copyLink(this.product?._id)
  }

  public openChat() {

  }

}
