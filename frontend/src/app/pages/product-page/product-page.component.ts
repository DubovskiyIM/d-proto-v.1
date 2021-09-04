import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../_services/product.service";
import SwiperCore, { Navigation, Thumbs } from "swiper"

SwiperCore.use([Navigation, Thumbs]);
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  private productId: string | undefined;
  public product;

  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    )
      .subscribe((data) => {
        this.productId = data;
        // this.product = this.productService.getProductById(this.productId);
        // console.log(this.product);
      });
  }

}
