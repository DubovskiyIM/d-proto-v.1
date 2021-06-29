import { User } from './user';

export interface Message {
  message: string;
  user: User;
  date: Date;
  type: string;
}

export class Room {
  public name: string;
  public description: string;
  public isUser: boolean;
  public isPrivate: boolean;
  public users: User[];
  public messages?: Message[];
  public createdAt: Date;
  public updatedAt: Date;

  public constructor({
                       name, description,
                       isUser, isPrivate,
                       users, messages,
                       createdAt, updatedAt}) {
    this.name = name;
    this.description = description;
    this.isUser = isUser;
    this.isPrivate = isPrivate;
    this.users = users || [];
    this.messages = messages || [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
