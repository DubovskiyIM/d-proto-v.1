import { User } from './user';

export interface Description {
  about: string;
  sizes: string[];
  brand: string;
}

export interface Product extends Document {
  // owner?: User;
  owner: any;
  title: string;
  image: string;
  description: Description | string;
  price: number;
  created: Date;
  availableQuantity: number;
}
