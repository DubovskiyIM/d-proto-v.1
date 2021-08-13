import {
  Body, Request,
  Controller,
  Get, Post, Put, Delete,
  HttpException, HttpStatus, UseGuards, Req
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from '@src/models/room.schema';
import { CreateRoomDto } from "@src/modules/rooms/dto/create-room.dto";
import { JwtAuthGuard } from "@src/common/guards/jwt-auth.guard";
import { RequestWithUser } from "@src/interfaces/requestWithUser.interface";
import {UsersService} from "@src/modules/users/users.service";

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: RequestWithUser) {
    return await this.roomsService.getRooms(req.user.id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async getRooms(@Request() req: RequestWithUser) {
    const rooms = await this.roomsService.getRooms(req.user.id);
    if (!rooms) {
      this.roomsService.createRoom(req.user.id)
    }
    return await this.roomsService.getRooms(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getRoomByUser(@Request() req: RequestWithUser): Promise<Room> {
    const selfId = req.user.id;
    const userId = req.params.id;
    if (!userId)
      throw new HttpException(
          'ID parameter is missing',
          HttpStatus.BAD_REQUEST,
      );

    let room = await this.roomsService.findOne({users: [selfId, userId]})
    if (!room) {
      const roomDto = {
        messages: [],
        users: [selfId, userId],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      room = await this.roomsService.createRoom(roomDto)
    }
    return room;
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
