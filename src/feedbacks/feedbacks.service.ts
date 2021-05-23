import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Feedback, FeedbackDocument } from '../models/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return new this.feedbackModel(createFeedbackDto);
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find();
  }

  async findOne(id: number): Promise<Feedback> {
    return this.feedbackModel.findById(id);
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackModel.findByIdAndUpdate(id, updateFeedbackDto);
  }

  async remove(id: number): Promise<Feedback> {
    return this.feedbackModel.remove(id);
  }
}
