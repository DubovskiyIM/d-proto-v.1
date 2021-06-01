import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { RegisterDto } from '../auth/dto/auth.dto';
import { User, UserDocument } from '../models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  create(userDTO: RegisterDto): Promise<User> {
    const createdUser = new this.userModel(userDTO);
    return createdUser.save();
  }

  findAll(): Observable<User[]> {
    return from(this.userModel.find());
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.userModel.findOne({ phone });
  }

  findById(id: number): Observable<User> {
    const user = this.userModel.findById(id);
    if (user) {
      return from(user);
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<User> {
    return from(this.userModel.findByIdAndUpdate(id, updateUserDto));
  }

  remove(id: number): Observable<User> {
    return from(this.userModel.findByIdAndRemove(id));
  }
}
