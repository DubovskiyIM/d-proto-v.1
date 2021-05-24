import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from '../auth/auth.dto';
import { User, UserDocument } from '../models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(userDTO: RegisterDTO): Promise<User> {
    const createdUser = new this.userModel(userDTO);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: number): Promise<User | undefined> {
    return this.userModel.findByIdAndRemove(id);
  }
}
