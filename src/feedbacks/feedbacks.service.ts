import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {from, Observable} from "rxjs";

import { Feedback, FeedbackDocument } from '../models/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<FeedbackDocument>,
  ) {}

  create(createFeedbackDto: CreateFeedbackDto): Observable<Feedback> {
    const createdFeedback = new this.feedbackModel(createFeedbackDto);
    return from(createdFeedback.save());
  }

  findAll(): Observable<Feedback[]> {
    return from(this.feedbackModel.find());
  }

  findOne(id: number): Observable<Feedback> {
    return from(this.feedbackModel.findById(id));
  }

  update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Observable<Feedback> {
    return from(this.feedbackModel.findByIdAndUpdate(id, updateFeedbackDto));
  }

  remove(id: number): Observable<Feedback> {
    return from(this.feedbackModel.remove(id));
  }
}
