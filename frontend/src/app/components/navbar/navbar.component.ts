import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from '../../_interfaces/user';
import { StarRatingColor } from '../star-ratings/star-ratings.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { NavigationService } from '../../_services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public rating = 4.4;

  public isLogged: true;
  public user: User;
  isOpenedMenu = false;
  @Input() navLinks: {
    link: string;
    label: string;
  }[];

  @ViewChild('sideBarMenu', { static: false })
  sideBarMenu: ElementRef;

  public starColor: StarRatingColor = StarRatingColor.accent;

  public starColorP: StarRatingColor = StarRatingColor.primary;

  public starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(private auth: AuthenticationService, private navigateService: NavigationService, private renderer: Renderer2) {}

  ngOnInit() {
    this.auth.currentUser.subscribe((res) => {
      if (res?.username) {
        this.isLogged = true;
        this.user = res;
      }
    });

    console.log('NAV-LINKS', this.navLinks);
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  public toggleNavbar(): void {
    if (this.isOpenedMenu) {
      this.renderer.addClass(this.sideBarMenu.nativeElement, 'close');
    } else {
      this.renderer.removeClass(this.sideBarMenu.nativeElement, 'close');
    }

    this.isOpenedMenu = !this.isOpenedMenu;
  }

  public goHomePage() {
    this.navigateService.goToLKHomePage();
  }
}
