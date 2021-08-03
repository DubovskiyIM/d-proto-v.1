import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_interfaces/user';

let config = {
  apiUrl: 'http://localhost:4000',
};

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser: any = this.authenticationService.currentUserValue;
    // const isLoggedIn = currentUser && currentUser.token;
    const isLoggedIn = currentUser;
    const isApiUrl = request.url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authentication: `${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
