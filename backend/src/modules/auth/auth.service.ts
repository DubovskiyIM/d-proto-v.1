import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/models/user.schema';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from '@src/interfaces/TokenPayload.interface';
import { RequestWithUser } from '@src/interfaces/requestWithUser.interface';
import { WsException } from "@nestjs/websockets";

@Injectable()
export class AuthService {
  public static getAuthToken(cookies: string): string {
    return cookies
        .split(';')
        .find(s => s.includes('Authentication='))
        .split('Authentication=')[1];
  }

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto): Promise<User> {
    try {
      const createdUser = await this.usersService.create(registrationData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      await AuthService.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
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

  public async verify(token: string, isWs: boolean = false): Promise<[any, User]> {
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findById(payload.userId);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
              'Unauthorized access',
              HttpStatus.BAD_REQUEST
          );
        }
      }

      return [payload, user];
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
