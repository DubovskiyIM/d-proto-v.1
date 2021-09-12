import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../_services/navigation.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() listCards = [];
  @Input() isHomePage = false;
  @Input() isProfilePage = true;
  updateMasonryLayout = false;

  constructor(private navigationService: NavigationService, private productService: ProductService) {}

  ngOnInit(): void {}

  updateGrid() {
    this.updateMasonryLayout = !this.updateMasonryLayout;
  }

  goToCreateProduct() {
    this.navigationService.goToCreateProductPage();
    // this.productService.productCreate().subscribe((res)=> {
    //   console.log(res);
    // })
    // this.navigationService.go
  }
}
