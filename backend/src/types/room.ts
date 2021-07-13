import { Document } from 'mongoose';
import { Message } from './message';
import { User } from './user';

export interface Room extends Document {
    name: String;
    description?: String;
    isUser: Boolean;
    isPrivate: Boolean;
    users?: User[];
    messages?: Message[];
    createdAt: Date;
    updatedAt: Date;
}
