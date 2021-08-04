import { Component, OnInit } from '@angular/core';
import { User } from '../../_interfaces/user';
import { StarRatingColor } from '../star-ratings/star-ratings.component';
import { AuthenticationService } from '../../_services/authentication.service';
import {NavigationService} from "../../_services/navigation.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public rating = 4.4;
  public isLogged: true;
  public user: User;
  public starColor: StarRatingColor = StarRatingColor.accent;

  public starColorP: StarRatingColor = StarRatingColor.primary;

  public starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(private auth: AuthenticationService, private navigateService: NavigationService) {}

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

  public goHomePage() {
    this.navigateService.goHomePage();
  }
}
