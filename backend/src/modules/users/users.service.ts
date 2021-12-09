import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/auth.dto';
import { User, UserDocument } from '@src/models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_NOT_FOUND } from '@src/modules/users/users.constants';
import {GetFollowersDto} from "@src/modules/users/dto/get-followers.dto";
import {ProductDocument} from "@src/models/product.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  public async create(userDTO: RegisterDto): Promise<User> {
    const createdUser = new this.userModel(userDTO);
    return await createdUser.save();
  }

  public async setAvatar(id: string, avatarUrl: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true },
    );
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

  public async findById(id: any): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async update(id: any, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  public async remove(id: any): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  public async followUser(
    userId: string,
    toFollowId: string,
  ): Promise<User | void> {
    const userToFollow = await this.userModel.findById(toFollowId);
    const currentUser = await this.userModel.findById(userId);
    if (!userToFollow && !currentUser) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    if (
      !userToFollow.followers.find((id) => id === userId) &&
      !currentUser.followingUsers.find((id) => id === toFollowId)
    ) {
      await userToFollow.followers.push(userId);
      await currentUser.followingUsers.push(toFollowId);
      await this.userModel
        .findByIdAndUpdate(toFollowId, userToFollow as Document)
        .exec();
      return await this.userModel
        .findByIdAndUpdate(userId, currentUser as Document)
        .exec();
    }
  }

  public async unfollowUser(userId: string, toUnfollowId: string) {
    const userToUnfollow = await this.userModel.findById(toUnfollowId);
    const currentUser = await this.userModel.findById(userId);
    if (!userToUnfollow && !currentUser) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    if (
      userToUnfollow.followers.find((id) => id === userId) &&
      currentUser.followingUsers.find((id) => id === toUnfollowId)
    ) {
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id !== userId,
      );
      currentUser.followingUsers = currentUser.followingUsers.filter(
        (id) => id !== toUnfollowId,
      );
      await this.userModel
        .findByIdAndUpdate(toUnfollowId, userToUnfollow as Document)
        .exec();
      await this.userModel
        .findByIdAndUpdate(userId, currentUser as Document)
        .exec();
    }
  }

  public async getFollowers(userId: string): Promise<GetFollowersDto> {
    const user = (await this.userModel.findById(userId)) as UserDocument;
    const followers = [];
    for (const usr of user.followingProducts) {
      const item = (await this.userModel.findById(
        usr,
      )) as UserDocument;
      followers.push(item);
    }
    return { followers };
  }
}
