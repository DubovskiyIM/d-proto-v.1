import {Component, Inject, OnInit} from '@angular/core';
import {SocialService} from "../../_services/social.service";
import {ProductService} from "../../_services/product.service";
import {TuiDialogService} from "@taiga-ui/core";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../_services/authentication.service";

class Data {
  constructor(
    readonly name: string,
    readonly code: string,
    readonly avatarUrl: string | null = null,
  ) {}

  toString(): string {
    return `${this.name}`;
  }
}



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public listCards;
  readonly createOrderForm = new FormGroup({
    trackNumber: new FormControl(''),
    selectUserFromOrder: new FormControl(''),
    selectedProducts: new FormControl(null),
  });
  public databaseMockData: ReadonlyArray<Data> = [
    new Data('@megaShoots', 'shoods123', 'https://source.unsplash.com/c_GmwfHBDzk/200x200'),
    new Data('@customVantys', 'customVant22', 'https://images.unsplash.com/photo-1431887915357-68b819fae322?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNDkzMzQ2MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200'),
  ];
  public labelForCombobox = 'Выберите пользователя';
  public myEnabledProductList = [];



  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              private authService: AuthenticationService,
              private socialService: SocialService,
              private productService: ProductService,
              ) {
  }

  ngOnInit(): void {
    this.productService.getProductsList().subscribe((res) => {
      this.listCards = res;
      // console.log(this.)
    });

    this.productService.getProductByOwnerForCreateOrder(this.authService.currentUserValue._id).subscribe((res: any) => {
      // console.log('this', res);
      this.myEnabledProductList = res;
      console.log('PRODUCT bu OWNER', res);
      // this.listCards = res;
    })
  }
  public showDialog(content) {
    this.dialogService.open(content).subscribe();
  }

  public createOrder(event: Event): void {
    console.log('ORDER FORM',  this.createOrderForm);
  }




}
