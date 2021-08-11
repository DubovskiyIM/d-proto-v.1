import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../_services/navigation.service'
import { ProductService } from '../../_services/product.service'

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
  masonryItems = [
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
  ];

  constructor(private navigationService: NavigationService, private productService: ProductService) {}

  ngOnInit(): void {}

  updateGrid() {
    console.log('jnkl');
    this.updateMasonryLayout = !this.updateMasonryLayout;
  }

  goToCreateProduct() {
    // this.
    // this.n
    this.navigationService.goToCreateProductPage();
    // this.productService.productCreate().subscribe((res)=> {
    //   console.log(res);
    // })
    // this.navigationService.go
  }

}
