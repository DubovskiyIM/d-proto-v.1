import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type MessageDocument = Message & Document;

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

    @Prop({ type: String, required: true })
    type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
