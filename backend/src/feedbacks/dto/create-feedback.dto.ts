import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ example: 1, description: 'The id of feedback' })
  id: number;

  @ApiProperty({ example: 5, description: 'The rating of feedback' })
  rating: number;

  @ApiProperty({
    example: 'Good stuff',
    description: 'The message of feedback',
  })
  message: string;
}
