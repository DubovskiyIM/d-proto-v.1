import { LoginDTO } from './../auth/auth.dto';
import { UserDocument } from './../models/user.schema';
import { RegisterDTO } from 'src/auth/auth.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  sanitizeUser(user: UserDocument) {
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
