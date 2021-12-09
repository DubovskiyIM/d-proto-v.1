import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from '../../_interfaces/user';
import { StarRatingColor } from '../star-ratings/star-ratings.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { NavigationService } from '../../_services/navigation.service';
import { MyProfileComponent } from '../../pages/my-profile/my-profile.component';
import { MyOrdersComponent } from '../../lk/my-orders/my-orders.component';
import { LikedProductsComponent } from '../../pages/liked-products/liked-products.component';
import { MessagesComponent } from '../../lk/messages/messages.component';
import { AddProductComponent } from '../../pages/add-product/add-product.component';
import { SettingsComponent } from '../../pages/settings/settings.component';

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

  public navLinksBottom = [
    {
      link: '',
      label: 'Уведомления',
      icon: 'bx bx-heart',
    },
    {
      link: '/lk/settings',
      label: 'Настройки',
      icon: 'bx bxs-cog',
    },
  ];

  public navLinks = [
    {
      link: '/lk/orders',
      label: 'Заказы',
      icon: 'bx bx-package',
      subLinks: [
        {
          link: '/lk/orders',
          label: 'Мои покупки',
        },
        {
          link: '/lk/orders',
          label: 'Заказы магазина',
        },
      ],
    },
    {
      link: '/lk/favorite',
      label: 'Избранное',
      icon: 'bx bx-heart',
    },
    {
      link: '/lk/messages',
      label: 'Сообщения',
      icon: 'bx bx-message-square-detail',
    },
  ];
  // bx bx-slider-alt
  // <i class=''></i>
  // navLinks2 = [1,2,3];

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

  public goToPage(event, navItem): void {
    event.preventDefault();

    if (navItem.subLinks?.length) {
      return;
    }

    this.navigateService.goToPageByLink(navItem.link);
  }

  public showSubMenu() {}
}
