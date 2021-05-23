import { Injectable, Post } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from '../types/payload';
import { UsersService } from '../users/users.service';
import { RegisterDTO, LoginDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.usersService.findOneByLogin(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  getHello(): string {
    return 'Hello World!';
  }

  // async signPayload(payload: Payload) {
  //   return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' })
  // }

  // async validateUser(userDTO: RegisterDTO): Promise<any> {
  //   const user = await this.usersService.create(userDTO);
  //   if (user && user.password === userDTO.password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
