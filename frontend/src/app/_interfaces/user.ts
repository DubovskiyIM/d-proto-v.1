import { Product } from './product';

export class User {
  _id?: string;
  avatar?: string;
  username?: string;
  password?: string;
  seller: boolean;
  address?: string;
  created?: Date;
  lastSeen?: Date;
  status?: string;
  phone: string;
  email?: string;
  name?: string;
  description?: string;
  location?: string;
  followers?: User[];
  followingUsers?: User[];
  followingProducts?: Product[];
  saved: Product[];
}
