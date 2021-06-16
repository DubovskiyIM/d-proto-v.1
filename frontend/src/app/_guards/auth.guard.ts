import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { NavigationService } from '../_services/navigation.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private navigationService: NavigationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      alert('Авторизуйтесь!');
      this.navigationService.next('login', {
        queryParams: { returnUrl: state.url },
      });
    }
    //   if (
    //     route.data.roles &&
    //     route.data.roles.indexOf(currentUser.userRole[0]) === -1
    //   ) {
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    //   return true;
    // }

    return true;
  }

  private hasUserInCookie() {
    return !!this.cookieService.get('Authentication');
  }
}
