import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { Payload } from './../types/payload';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  // @Post('login')
  // async login(@Body() userDTO: LoginDTO) {
  //   const user = await this.userService.findByLogin(userDTO);
  //   const payload: Payload = {
  //     username: user.username,
  //     password: user.password,
  //     seller: user.seller
  //   }
  //   const token = await this.authService.signPayload(payload);
  //   return { user, token }
  // }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.usersService.create(userDTO);
    return { user }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
