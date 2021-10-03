import { Module } from '@nestjs/common';

import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';

import { ChatGateway } from './chat.gateway';
import { UsersModule } from '@src/modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@src/models/user.schema';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
