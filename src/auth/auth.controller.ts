import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.schema';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

import { RequestWithUser } from '../interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() userDTO: RegisterDTO): Observable<User> {
    try {
      const { username, email, phone } = userDTO;
      // const [byUsername, byEmail, byPhone] = [
      //   this.usersService.findByUsername(username).subscribe(),
      //   this.usersService.findByPhone(phone).subscribe(),
      //   this.usersService.findByEmail(email).subscribe(),
      // ];
      this.usersService.findByUsername(username).subscribe((user: User) => {
        if (user) {
          throw new HttpException(
            'Username has been exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      this.usersService.findByPhone(phone).subscribe((user: User) => {
        if (user) {
          throw new HttpException(
            'Phone has been exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      this.usersService.findByEmail(email).subscribe((user: User) => {
        if (user) {
          throw new HttpException(
            'Email has been exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      return this.authService.register(userDTO);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Observable<Response> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return of(response.send(user));
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Observable<Response> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return of(response.sendStatus(200));
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth(
    @Req() request: Request,
    @Res() response: Response,
  ): Observable<Response> {
    return of(response);
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
