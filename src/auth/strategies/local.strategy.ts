import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {Observable} from "rxjs";
import { AuthService } from '../auth.service';
import { User } from '../../models/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  validate(email: string, password: string): Observable<User> {
    return this.authService.getAuthenticatedUser(email, password);
  }
}
