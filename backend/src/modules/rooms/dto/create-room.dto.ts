import { User } from "@src/models/user.schema";
import { Message } from "@src/models/message.schema";

export class CreateRoomDto {
    name: string;
    description: string[];
    isUser: boolean;
    isPrivate: boolean;
    users: User[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
