import { Feedback } from './feedback';
import { Product } from './product';
import { Document } from 'mongoose';

export interface Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface Seller {
  itemsSold: number;
  feedbacks: Feedback[];
}

// Role Seller
// export interface RoleSeller {
//
// }

export interface User extends Document {
  avatar: string;
  username: string;
  password: string;
  seller: boolean;
  address: Address;
  created: Date;
  lastSeen: Date;
  status: string;
  phone: string;
  email: string;
  name: string;
  description: string;
  location: string;
  followers: User[];
  followingUsers: User[];
  followingProducts: Product[];
  saved: Product[];
  rooms: string[];
}
