import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/types/user';

export class GetFollowersDto {
  @ApiProperty({ example: 'Users Array', description: 'Array of followers' })
  followers: User[];
}
