import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.schema';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../interfaces/TokenPayload.interface';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public register(registrationData: RegisterDTO): Observable<User> {
    try {
      const createdUser = this.usersService
        .create(registrationData)
        .pipe(map((user: User) => (user.password = undefined)));
      return from(createdUser);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Observable<User> {
    try {
      return this.usersService.findByEmail(email).pipe(
        map((user: User) => {
          AuthService.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        }),
      );
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private static verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  public getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async googleLogin(@Req() user: RequestWithUser): Promise<any> {
    if (!user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user,
    };
  }
}
