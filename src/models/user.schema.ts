import { Schema, Prop, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Product } from './product.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
  
  @Prop({
    type: Object
  })
  address: {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
  };
  
  @Prop()
  description: string;
  
  @Prop()
  location: string;
  
  @Prop({ default: false })
  seller: boolean;
  
  @Prop()
  status: string;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  followers: User[];
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  followingUsers: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  followingProducts: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  saved: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this['password'], 10);
//     this['password'] = hashed;
//     return next();
//   } catch(err) {
//     return next(err);
//   }
// })
