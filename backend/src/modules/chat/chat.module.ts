import { Module } from '@nestjs/common';

import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';

import { ChatGateway } from './chat.gateway';


@Module({
  imports: [AuthModule, RoomsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
