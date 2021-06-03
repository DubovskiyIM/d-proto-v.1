import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthenticationService) {}

  public registration(controls) {
    if (!controls) {
      return;
    }
    const values = {
      username: controls?.username?.value,
      phone: controls?.phone.value,
      password: controls?.password.value,
    };
  }
}
