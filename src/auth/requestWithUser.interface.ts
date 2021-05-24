import { Request } from 'express';
import { User } from '../types/user';

export interface RequestWithUser extends Request {
  user: User;
}
