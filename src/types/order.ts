import { Document } from 'mongoose';
import { Product } from './product';
import { User } from './user';

interface ProductOrder {
  product: Product;
  quantity: Number;
}

export interface Order extends Document {
  owner: User;
  totalPrice: Number;
  products: ProductOrder[];
  created: Date;
}
