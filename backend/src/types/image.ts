export interface Image extends Document {
    name: String;
    description: String;
    type: String;
    createdAt: Date;
    img: {
        data: Buffer;
        contentType: String;
    }
}
