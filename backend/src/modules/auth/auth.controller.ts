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
  Param,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '@src/models/user.schema';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

import { GoogleAuthGuard } from '@src/common/guards/google-auth.guard';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@src/common/guards/local-auth.guard';

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from  'multer';
import { extname } from  'path';

import { RequestWithUser } from '@src/interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  SERVER_URL:  string  =  "http://localhost:3001/";
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDto): Promise<User> {
    try {
      const { username, email, phone } = userDTO;
      const [byUsername, byEmail, byPhone] = [
        await this.usersService.findByUsername(username),
        await this.usersService.findByPhone(phone),
        await this.usersService.findByEmail(email),
      ];
      if (byUsername || byEmail || byPhone) {
        throw new HttpException(
          'User has already been exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.authService.register(userDTO);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { user } = request;
      const cookie = await this.authService.getCookieWithJwtToken(user.id);
      response.setHeader('Set-Cookie', cookie);
      user.password = undefined;
      return await response.send(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(
      @Res() response: Response,
  ): Promise<Response> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(
      @Res() response: Response,
  ): Promise<Response> {
    return response;
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req): Promise<any> {
    return await this.authService.googleLogin(req);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './avatars',
          filename: (_req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      })
  )
  uploadAvatar(@Param('id') id, @UploadedFile() file) {
    this.usersService.setAvatar(id, `${this.SERVER_URL}${file.path}`);
  }

  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
