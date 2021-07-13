import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Message, MessageDocument} from '@src/models/message.schema';
import {Room, RoomDocument} from "@src/models/room.schema";
import {ChatService} from '@src/modules/chat/chat.service';
import {CreateRoomDto} from "@src/modules/rooms/dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
      private readonly chatService: ChatService,
      @InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
      @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(dto);
  }

  async addMessage(message: Message, id: string): Promise<Room> {
    const room = await this.findById(id);
    const newMessage = await this.messageModel.create(message);
    await this.roomModel.updateOne({_id: id}, {$push: {messages: newMessage}});

    return room;
  }

  async findMessages(id: string, limit: number): Promise<Message[]> {
    let room = await this.findWithLimit(id, limit);

    if (!room) {
      const userRoom = new this.roomModel({ _id: id, name: id, is_user: true });
      room = await this.create(userRoom);
    }
    const messages = await this.chatService.getMessagesByIdArray(room.messages);
    console.log(messages);
    return messages
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
