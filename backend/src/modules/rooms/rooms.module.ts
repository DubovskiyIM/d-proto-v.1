import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from '@src/models/room.schema';
import { MessageSchema } from "@src/models/message.schema";
import { ChatService } from '@src/modules/chat/chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  controllers: [RoomsController],
  providers: [RoomsService, ChatService],
  exports: [RoomsService],
})
export class RoomsModule {
}
