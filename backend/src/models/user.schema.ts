import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

export class Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: Address })
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

  @Prop()
  followers: string[];

  @Prop()
  followingUsers: string[];

  @Prop()
  followingProducts: string[];

  @Prop()
  savedProducts: string[];

  @Prop()
  rooms: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  } catch (err) {
    return next(err);
  }
});
