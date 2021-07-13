import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Feedback } from '../../models/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return await this.feedbacksService.create(createFeedbackDto);
  }

  @Get()
  async findAll(): Promise<Feedback[]> {
    return await this.feedbacksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Feedback> {
    return await this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return await this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Feedback> {
    return await this.feedbacksService.remove(+id);
  }
}
