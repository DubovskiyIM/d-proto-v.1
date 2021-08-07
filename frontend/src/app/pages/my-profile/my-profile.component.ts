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
  public userCard = {
    username: 'velldfgdgdf',
    avatar: 'https://i.picsum.photos/id/1022/512/512.jpg?hmac=nl9w07uW1LOTANdOs1nRNA-U1O7ZumXYL1d8TtmCqmI',
  };

  public listCards: any = [];
  private userid: number | undefined;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => params.getAll('id')),
    ).subscribe((data) => {
        console.log(data);
        this.userid = +data;
      });
    this.authenticationService.currentUser.subscribe((user) => {
      this.userProfileData = user;
      console.log(user);
      this.productService.getProductByOwner(user).subscribe((res) => {
        console.log('this');
        this.listCards = res;
      })
    });


  }

}
