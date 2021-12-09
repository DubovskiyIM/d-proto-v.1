import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AuthenticationService} from '../../_services/authentication.service'
import {ProductService} from '../../_services/product.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public userProfileData;
  public listCards: any = [];
  private userid: number | undefined;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    ).subscribe((data) => {
        this.userid = +data;
      });
    this.authenticationService.currentUser.subscribe((user) => {
      this.userProfileData = user;
      this.getUserCardsList();
    });


  }

  private getUserCardsList() {
    this.productService.getProductByOwner(this.userProfileData._id).subscribe((res) => {
      // console.log('this', res);
      this.listCards = res;
    })
  }

  public showDialog(template) {

  }
}
