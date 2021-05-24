import { Document } from 'mongoose';
import { User } from './user';

export interface Size {
  id: number;
  type: string;
  value: string;
}

export interface Description {
  about: string;
  sizes: Size[];
  brand: string;
}

export interface Product extends Document {
  owner: User;
  title: string;
  image: string;
  description: Description;
  price: number;
  created: Date;
  availableQuantity: number;
}
