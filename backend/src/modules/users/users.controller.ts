import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserSchema } from '@src/models/user.schema';
import { IdValidationPipe } from '@src/pipes/id-validation.pipe';
import { RequestWithUser } from '@src/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { GetFollowersDto } from '@src/modules/users/dto/get-followers.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSchema> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserSchema[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserSchema> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserSchema> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserSchema> {
    return await this.usersService.remove(id);
  }

  @Post(':id/follow')
  @UseGuards(JwtAuthGuard)
  async follow(
    @Param('id', IdValidationPipe) id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    await this.usersService.followUser(req.user.id, id);
  }

  @Post(':id/unfollow')
  @UseGuards(JwtAuthGuard)
  async unfollow(
    @Param('id', IdValidationPipe) id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    await this.usersService.unfollowUser(req.user.id, id);
  }

  @Get('followers')
  @UseGuards(JwtAuthGuard)
  async getLikedProducts(
    @Req() req: RequestWithUser,
  ): Promise<GetFollowersDto> {
    return await this.usersService.getFollowers(req.user.id);
  }
}
