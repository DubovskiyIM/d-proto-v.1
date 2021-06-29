import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/auth.dto';
import { User, UserDocument } from '../../models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  public async create(userDTO: RegisterDto): Promise<User> {
    const createdUser = new this.userModel(userDTO);
    return await createdUser.save();
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  public async findByPhone(phone: string): Promise<User> {
    return await this.userModel.findOne({ phone });
  }

  public async findById(id: number): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  public async remove(id: number): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
