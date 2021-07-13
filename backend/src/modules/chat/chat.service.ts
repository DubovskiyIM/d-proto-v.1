import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { Room, RoomDocument } from "@src/models/room.schema";
import { Message, MessageDocument } from "@src/models/message.schema";

@Injectable()
export class ChatService {

  constructor(
      @InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
      @InjectModel('Message') private messageModel: Model<MessageDocument>
  ) {}

  public async getMessagesByIdArray(messageIdArray) {
    return this.messageModel.find({"_id" : {"$in" : messageIdArray}})
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
