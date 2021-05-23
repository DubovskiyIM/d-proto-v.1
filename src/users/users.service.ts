import { RegisterDTO } from '../auth/auth.dto';
import { UserDocument } from '../models/user.schema';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  private static sanitizeUser(user: UserDocument): UserDocument {
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDTO: RegisterDTO): Promise<User> {
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return UsersService.sanitizeUser(createdUser);
  }

  async findOneByLogin(username): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: number): Promise<User | undefined> {
    return this.userModel.findByIdAndRemove(id);
  }
}
