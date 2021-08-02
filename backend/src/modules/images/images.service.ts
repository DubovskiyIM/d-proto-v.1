import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageDocument } from "@src/models/image.schema";

@Injectable()
export class ImagesService {
  constructor(
      @InjectModel('Image') private imageModel: Model<ImageDocument>,
  ) {}

  async create(createImageDto: any) {
    const uploadedImage = await new this.imageModel(createImageDto);
    return await uploadedImage.save();
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.imageModel.findById(id).exec();
    image.updateOne(updateImageDto);
    return image.save();
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
