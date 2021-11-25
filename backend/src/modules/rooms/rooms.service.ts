import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message, MessageDocument } from '@src/models/message.schema';
import { Room, RoomDocument } from '@src/models/room.schema';
import { ChatService } from '@src/modules/chat/chat.service';
import { CreateRoomDto } from '@src/modules/rooms/dto/create-room.dto';
import { UserDocument } from '@src/models/user.schema';

@Injectable()
export class RoomsService {
  public room: Room;
  constructor(
    private readonly chatService: ChatService,
    @InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllRooms(roomIds: string[]): Promise<Room[] | null> {
    return await this.roomModel.find({ _id: { $in: roomIds } });
  }

  async findRoom(userId: string, selfId: string): Promise<Room | null> {
    const user1 = await this.userModel.findById(userId);
    const user2 = await this.userModel.findById(selfId);
    const room = await this.roomModel.findOne({
      users: { $all: [userId, selfId] },
    });
    if (room) {
      return room;
    }
    const newRoom = await this.roomModel.create({});
    await this.roomModel.updateOne(
      { _id: newRoom._id },
      { $push: { users: user1 } },
    );
    await this.roomModel.updateOne(
      { _id: newRoom._id },
      { $push: { users: user2 } },
    );

    return await newRoom.save();
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomModel.create(createRoomDto);
  }

  async addMessage(message: Message, id: string): Promise<Room> {
    const room = await this.findById(id);
    const newMessage = await this.messageModel.create(message);
    await this.roomModel.updateOne(
      { _id: id },
      { $push: { messages: newMessage } },
    );

    return room;
  }

  async findMessages(id: string, limit: number): Promise<Message[]> {
    const room = await this.findWithLimit(id, limit);
    return await this.chatService.getMessagesByIdArray(room.messages);
  }

  async findAll(options?: any): Promise<Room[] | null> {
    return await this.roomModel.find(options).exec();
  }

  async findWithLimit(id: string, limit: number): Promise<Room | null> {
    return await this.roomModel.findById(id).slice('messages', limit).exec();
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

  async getRoomsById(id): Promise<Room[]> {
    return await this.roomModel.find({ _id: { $in: id } });
  }
}
