import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {User} from "@src/models/user.schema";

export type ImageDocument = Image & Document;

@Schema()
export class Image {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    type: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Object, required: true })
    img: {
        data: Buffer,
        contentType: String
    }

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    uploadedBy: User;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
