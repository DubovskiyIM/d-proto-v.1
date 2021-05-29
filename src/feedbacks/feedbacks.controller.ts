import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {Observable} from "rxjs";
import { Feedback } from 'src/models/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto): Observable<Feedback> {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get()
  findAll(): Observable<Feedback[]> {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Feedback> {
    return this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Observable<Feedback> {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<Feedback> {
    return this.feedbacksService.remove(+id);
  }
}
