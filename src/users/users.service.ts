import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RegisterDTO} from '../auth/auth.dto';
import {User, UserDocument} from '../models/user.schema';
import {UpdateUserDto} from './dto/update-user.dto';

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

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(+id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone }).exec();
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findById(+id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: number): Promise<User | undefined> {
    return this.userModel.findByIdAndRemove(id);
  }
}
