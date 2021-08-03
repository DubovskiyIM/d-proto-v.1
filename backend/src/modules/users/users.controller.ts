import {
  Get, Post, Patch, Delete,
  Controller, Body, Param, Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@src/models/user.schema';
import { IdValidationPipe } from "@src/pipes/id-validation.pipe";
import { RequestWithUser } from "@src/interfaces/requestWithUser.interface";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }

  @Post(':id/follow')
  async follow(
      @Param('id', IdValidationPipe) id: string,
      @Req() req: RequestWithUser
  ): Promise<void> {
    await this.usersService.followUser(req.user.id, id);
  }

  @Post(':id/unfollow')
  async unfollow(
      @Param('id', IdValidationPipe) id: string,
      @Req() req: RequestWithUser
  ): Promise<void> {
    await this.usersService.unfollowUser(req.user.id, id);
  }
}
