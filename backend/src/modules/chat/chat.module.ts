import { Module } from '@nestjs/common';

import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';

import { ChatGateway } from './chat.gateway';
import {JwtService} from "@nestjs/jwt";


@Module({
  imports: [AuthModule, RoomsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
