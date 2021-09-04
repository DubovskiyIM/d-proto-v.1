import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private static readonly httpActions = {
    // like: 'li'
    follow: 'follow',
    login: 'auth/login',
    logout: 'auth/logout',
  };

  private currentUser;


  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseUrl: string, private authenticationService: AuthenticationService) {
    this.baseUrl = 'api' + this.baseUrl;
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
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
}
