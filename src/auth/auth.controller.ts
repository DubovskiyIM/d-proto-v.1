import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './auth.dto';
import { UsersService } from '../users/users.service';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.usersService.create(userDTO);
    return { user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  // Protected routes
  @UseGuards(JwtAuthGuard)
  @Get('protectedJwt')
  getJwt(@Request() req) {
    return req.user;
  }
}
