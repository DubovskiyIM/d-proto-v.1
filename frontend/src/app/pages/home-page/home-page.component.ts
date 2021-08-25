import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public listCards;
  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.productService.getProductsList().subscribe((res) => {
      this.listCards = res;
      // console.log(this.)
    });

  }
}
