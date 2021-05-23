import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
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
    const { username, email, phone } = userDTO;
    const [byUsername, byEmail, byPhone] = [
      await this.usersService.findByEmail(email),
      await this.usersService.findByPhone(phone),
      await this.usersService.findByUsername(username),
    ];
    if (byUsername || byEmail || byPhone) {
      throw new HttpException(
        'User has already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!username) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    if (!phone) {
      throw new HttpException('Phone is required', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.usersService.create(userDTO);
    return { createdUser };
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
