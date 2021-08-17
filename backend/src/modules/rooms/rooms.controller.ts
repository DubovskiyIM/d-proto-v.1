import {
  Request, Controller,
  Get, Put, Delete,
  HttpException, HttpStatus, UseGuards, Param
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from '@src/models/room.schema';
import { JwtAuthGuard } from "@src/common/guards/jwt-auth.guard";
import { RequestWithUser } from "@src/interfaces/requestWithUser.interface";

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRooms(@Request() req: RequestWithUser): Promise<Room[] | null> {
    return await this.roomsService.getAllRooms(req.user.rooms);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getRoomByUser(@Param() param, @Request() req: RequestWithUser): Promise<Room> {
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
