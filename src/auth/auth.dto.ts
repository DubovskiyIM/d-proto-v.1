import { Address } from '../types/user';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  name: string;
  seller?: boolean;
  address?: Address;
  phone?: string;
  email?: string;
  description?: string;
}
