import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Room } from '@src/types/room';
import { Message } from '@src/types/message';
import { MessageDocument } from "@src/models/message.schema";

@Injectable()
export class RoomsService {
  constructor(
      @InjectModel('Room') private readonly roomModel: Model<Room>,
      @InjectModel('Message') private messageModel: Model<MessageDocument>
  ) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save();
  }

  async addMessage(message: Message, id: string): Promise<Room> {
    const room = await this.findById(id);
    const newMessage = await new this.messageModel(message);
    newMessage.save();
    newMessage.user = message.user._id;
    await this.roomModel.updateOne({_id: id}, {$push: {messages: newMessage}});
    console.log(newMessage);

    return await room.save();
  }

  async findMessages(id: string, limit: number): Promise<Message[] | null> {
    let room = await this.findWithLimit(id, limit);

    if (!room) {
      const userRoom = new this.roomModel({ _id: id, name: id, is_user: true });
      room = await this.create(userRoom);
    }

    return room.messages;
  }

  async findAll(options?: any): Promise<Room[] | null> {
    return await this.roomModel.find(options).exec();
  }

  async findWithLimit(id: string, limit: number): Promise<Room | null> {
    return await this.roomModel
        .findById(id)
        .slice('messages', limit)
        // .populate('messages.user', { _id: 1, username: 1, email: 1 })
        .exec();
  }

  async findById(id: string): Promise<Room | null> {
    return await this.roomModel.findById(id).exec();
  }

  async findOne(options?: any, fields?: any): Promise<Room | null> {
    return await this.roomModel.findOne(options, fields).exec();
  }

  async update(id: string, newValue: Room): Promise<Room | null> {
    return await this.roomModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: string): Promise<Room | null> {
    return await this.roomModel.findByIdAndRemove(id).exec();
  }
}
