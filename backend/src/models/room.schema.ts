import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from "./user.schema";
import { Message } from "./message.schema";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop()
    name: string;

    @Prop({ type: String })
    description: string[];

    @Prop({ type: Boolean, default: false })
    isUser: boolean;

    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    users: User[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    })
    messages: Message[];

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.pre('save', function(next) {
    this['updatedAt'] = new Date();
    next();
});
