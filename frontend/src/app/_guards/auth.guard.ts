import { Injectable } from '@angular/core';
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
    private navigationService: NavigationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    // document.cookie;
    if (currentUser) {
      return true;
    } else {
      alert('Авторизуйтесь!');
      this.navigationService.next('login', {
        queryParams: { returnUrl: state.url },
      });
    }

    return true;
  }
}
