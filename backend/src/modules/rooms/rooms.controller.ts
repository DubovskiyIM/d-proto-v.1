import {
  Request, Controller,
  Get, Put, Delete,
  HttpException, HttpStatus, UseGuards, Param
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from '@src/models/room.schema';
import { JwtAuthGuard } from "@src/common/guards/jwt-auth.guard";
import { RequestWithUser } from "@src/interfaces/requestWithUser.interface";
import {CreateRoomDto} from "@src/modules/rooms/dto/create-room.dto";
import {UsersService} from "@src/modules/users/users.service";

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService, private usersService: UsersService) {}

  // @Get('rooms')
  // @UseGuards(JwtAuthGuard)
  // async create(@Request() req: RequestWithUser) {
  //   console.log(req.user.id);
  //   return await this.roomsService.getRoomsById(req.user.id);
  // }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async getRooms(@Request() req: RequestWithUser) {
  //   console.log(req.user.id, req.params.id);
  //   const rooms = await this.roomsService.getRoomsById(req.user.id);
  //   if (!rooms) {
  //     this.roomsService.createRoom(req.user.id)
  //   }
  //   return await this.roomsService.getRoomsById(req.user.id);
  // }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getRoomByUser(@Param() param, @Request() req: RequestWithUser): Promise<Room> {
    console.log(param.id, req.user.id);
    return this.roomsService.findRoom(param.id, req.user.id);
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
          'ID parameter is missing',
          HttpStatus.BAD_REQUEST,
      );

    await this.roomsService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
          'ID parameter is missing',
          HttpStatus.BAD_REQUEST,
      );

    await this.roomsService.delete(id);
  }
}
