import { Component, OnInit } from '@angular/core';
import { StarRatingColor } from '../star-ratings/star-ratings.component';
import { AuthService } from '../../../../../src/auth/auth.service';
import { User } from '../../_interfaces/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-lk-navbar-items',
  templateUrl: './lk-navbar-items.component.html',
  styleUrls: ['./lk-navbar-items.component.scss'],
})
export class LkNavbarItemsComponent implements OnInit {
  public rating: number = 4.4;
  public isLogged: true;
  public user: User;
  public starColor: StarRatingColor = StarRatingColor.accent;

  public starColorP: StarRatingColor = StarRatingColor.primary;

  public starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.currentUser.subscribe((res) => {
      if (res?.username) {
        this.isLogged = true;
        this.user = res;
      }
    });
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }
}
