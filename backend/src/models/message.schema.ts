import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type MessageDocument = Message & mongoose.Document;

@Schema()
export class Message {
    @Prop({ type: String, required: true })
    message: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: User[];

    @Prop({ type: Date, required: true })
    date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
