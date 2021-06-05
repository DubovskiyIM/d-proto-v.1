export class User {
  avatar?: string;
  username?: string;
  password?: string;
  seller: boolean;
  address?: any;
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
  followingProducts?: any[];
  saved: any[];
}
