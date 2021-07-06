import { Document } from 'mongoose';
import { User } from './user';

export interface Message extends Document {
    message: String;
    user: User;
    date: Date;
    type: String;
}
