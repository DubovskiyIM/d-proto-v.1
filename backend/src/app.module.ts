import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '@src/configs/mongo.config';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';

import { AuthModule } from '@src/modules/auth/auth.module';
import { FilesModule } from '@src/modules/files/files.module';
import { ChatModule } from '@src/modules/chat/chat.module';
import { RoomsModule } from '@src/modules/rooms/rooms.module';
import { UsersModule } from '@src/modules/users/users.module';
import { OrdersModule } from '@src/modules/orders/orders.module';
import { ProductsModule } from '@src/modules/products/products.module';
import { FeedbacksModule } from '@src/modules/feedbacks/feedbacks.module';

import { SharedModule } from "@src/shared/shared.module";

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
    RoomsModule,
    ChatModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
