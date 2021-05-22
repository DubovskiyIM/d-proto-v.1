import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from './user.schema';
import { Product } from './product.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', })
  owner: User;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[];

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop({ default: Date.now })
  created: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
