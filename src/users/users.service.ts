import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../types/user';

@Injectable()
export class UsersService {
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDTO: CreateUserDto) {
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
