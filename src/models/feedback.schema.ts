import { Schema, Prop, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from './user.schema';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', })
  user: User;

  @Prop()
  id: number;

  @Prop()
  rating: number;

  @Prop()
  message: string;

  @Prop()
  date: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
