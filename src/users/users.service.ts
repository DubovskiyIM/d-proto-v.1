import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../types/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDTO: RegisterDTO) {
    const { username, password } = userDTO;
    const user = await this.findOneByLogin(userDTO);
    if (user) {
      throw new HttpException('User has already exist', HttpStatus.BAD_REQUEST);
    } else if (username.length < 6) {
      throw new HttpException('Login should be at least 6 digits', HttpStatus.BAD_REQUEST);
    } else if (password.length < 6) {
      throw new HttpException('password should be at leaste 6 digits', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findOneByLogin(userDTO: LoginDTO): Promise<User | undefined> {
    const { username } = userDTO;
    return await this.userModel.findOne({ username });
  }

  // async create(userDTO: RegisterDTO) {
  //   const { username } = userDTO;
  //   const user = await this.userModel.findOne({ username });
  //   if (user) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   const createdUser = new this.userModel(userDTO);
  //   await createdUser.save();
  //   return this.sanitizeUser(createdUser);
  // }

  // async find() {
  //   return await this.userModel.find();
  // }

  // async findByLogin(userDTO: LoginDTO) {
  //   const { username, password } = userDTO;
  //   const user = await this.userModel
  //     .findOne({ username })
  //     .select('username password seller created address');
  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }

  //   if (await bcrypt.compare(password, user.password)) {
  //     return this.sanitizeUser(user);
  //   } else {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }
  // }

  // async findByPayload(payload: Payload) {
  //   const { username } = payload;
  //   return await this.userModel.findOne({ username });
  // }

  // sanitizeUser(user: User) {
  //   const sanitized = user.toObject();
  //   delete sanitized['password'];
  //   return sanitized;
  // }
}