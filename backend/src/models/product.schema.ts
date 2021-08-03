import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' })
  feedback: string[];

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

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  availableQuantity: number;

  @Prop()
  tags: string[];

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ type: Object })
  description: {
    about: string;
    sizes: string[];
    brand: string;
  };

  @Prop()
  likes: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
