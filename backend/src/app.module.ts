import { UsersModule } from './modules/users/users.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { OrdersModule } from './modules/orders/orders.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { FilesModule } from './modules/files/files.module';
import { MessageModule } from './modules/message-events/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    FeedbacksModule,
    FilesModule,
    MessageModule,
    RoomsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
