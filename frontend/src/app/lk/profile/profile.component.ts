import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userid: string | undefined;
  public userProfileData;
  public listCards: any = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    )
      .subscribe((data) => {
        this.userid = data;
        this.getUserCardsList();
      });
  }

  private getUserCardsList() {

    this.productService.getProductByOwner(this.userid).subscribe((res) => {
      console.log('this', res);
      this.listCards = res;
    })
  }
}
