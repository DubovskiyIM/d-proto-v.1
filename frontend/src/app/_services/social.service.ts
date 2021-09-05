import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {AuthenticationService} from "./authentication.service";
import {ClipboardService} from "ngx-clipboard";

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private static readonly httpActions = {
    // like: 'li'
    follow: 'follow',
    login: 'auth/login',
    logout: 'auth/logout',
    getLiked: 'products/liked'
  };

  private currentUser;


  constructor(private http: HttpClient,
              @Inject(APP_BASE_HREF) private baseUrl: string,
              private authenticationService: AuthenticationService,
              private clipboardService: ClipboardService) {
    this.baseUrl = 'api' + this.baseUrl;
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  public copyLink(productId: string): void {
    const location = window.location.href + 'product/' + productId;
    this.clipboardService.copyFromContent(location);
  }

  public follow(userId: string) {
    return this.http.post(`api/users/${userId}/follow`, {});
  }

  public unFollow(userId: string) {
    return this.http.post(`${this.baseUrl}users/${userId}/unfollow`, {id: userId})
  }

  public likeProduct(productId) {
    return this.http.post(`${this.baseUrl}products/${productId}/like`, {id: productId})
  }

  public unlikeProduct(productId) {
    return this.http.post(`${this.baseUrl}products/${productId}/unlike`, {id: productId})
  }

  public getLikedProducts() {
    return this.http.get(`${this.baseUrl}products/liked`)
  }

  public getProductFeedbacks() {
    return [
      {
        user: {
          name: 'loky loed',
          avatar: 'https://i.etsystatic.com/iusa/222b1c/84814092/iusa_400x400.84814092_aoru.jpg?version=0',
        },
        photo: 'https://i.etsystatic.com/17482531/r/il/ddc82c/3227976850/il_794xN.3227976850_rtve.jpg',
      },
      {
        user: {
          name: 'loky loed',
          avatar: 'https://i.etsystatic.com/iusa/222b1c/84814092/iusa_400x400.84814092_aoru.jpg?version=0',
        },
        photo: 'https://i.etsystatic.com/17482531/r/il/ddc82c/3227976850/il_794xN.3227976850_rtve.jpg',
      },
      {
        user: {
          name: 'loky loed',
          avatar: 'https://i.etsystatic.com/iusa/222b1c/84814092/iusa_400x400.84814092_aoru.jpg?version=0',
        },
        photo: 'https://i.etsystatic.com/17482531/r/il/ddc82c/3227976850/il_794xN.3227976850_rtve.jpg',
      },
      {
        user: {
          name: 'loky loed',
          avatar: 'https://i.etsystatic.com/iusa/222b1c/84814092/iusa_400x400.84814092_aoru.jpg?version=0',
        },
        photo: 'https://i.etsystatic.com/17482531/r/il/ddc82c/3227976850/il_794xN.3227976850_rtve.jpg',
      },
      {
        user: {
          name: 'loky loed',
          avatar: 'https://i.etsystatic.com/iusa/222b1c/84814092/iusa_400x400.84814092_aoru.jpg?version=0',
        },
        photo: 'https://i.etsystatic.com/17482531/r/il/ddc82c/3227976850/il_794xN.3227976850_rtve.jpg',
      },
    ]
  }
}
