import { Product } from '../../../../src/types/product';
import { Address } from '../../../../src/types/user';

export class User {
  avatar?: string;
  username?: string;
  password?: string;
  seller: boolean;
  address?: Address;
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
