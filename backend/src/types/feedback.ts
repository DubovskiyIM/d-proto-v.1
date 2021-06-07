import { User } from './user';

export interface Feedback {
  id: number;
  user: User;
  rating: number;
  message: string;
  date: Date;
}
