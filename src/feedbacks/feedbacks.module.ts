import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Feedback, FeedbackSchema } from './../models/feedback.schema';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }])
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
