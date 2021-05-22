import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Feedback } from './feedback.schema';
import { User } from './user.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' })
  feedback: Feedback[];

  @Prop()
  title: string;

  @Prop()
  images: string[];

  @Prop()
  price: number;

  @Prop()
  status: string;

  @Prop()
  style: string;

  @Prop()
  color: string;

  @Prop()
  rating: number;

  @Prop()
  availableQuantity: number;

  @Prop()
  tags: string[];

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ type: Object })
  description: {
    about: String;
    sizes: [{
      id: number,
      type: string,
      value: string,
    }];
    brand: String;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
