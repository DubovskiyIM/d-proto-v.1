import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'NewUser', description: 'The username of User' })
  username: string;

  @ApiProperty({ example: '123321', description: 'The password of User' })
  password: string;

  @ApiProperty({ example: 'Ivan', description: 'The name of User' })
  name: string;
}
