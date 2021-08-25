import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private static readonly httpActions = {
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
    return this.http.post(`api/users/${userId}/follow`,{});
  }

}
