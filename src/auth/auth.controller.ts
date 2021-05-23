import { LocalAuthGuard } from './../guards/local-auth.guard';
import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { Payload } from './../types/payload';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.usersService.create(userDTO);
    return { user }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user) {
    return { message: 'Logged In' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello() {
    return this.authService.getHello();
  }

}
