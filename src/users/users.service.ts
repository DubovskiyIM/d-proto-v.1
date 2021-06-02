import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { RegisterDTO } from '../auth/dto/auth.dto';
import { User, UserDocument } from '../models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  create(userDTO: RegisterDTO): Observable<User> {
    const createdUser = new this.userModel(userDTO);
    return from(createdUser.save());
  }

  findAll(): Observable<User[]> {
    return from(this.userModel.find());
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }));
  }

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }));
  }

  findByPhone(phone: string): Observable<User> {
    return from(this.userModel.findOne({ phone }));
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
