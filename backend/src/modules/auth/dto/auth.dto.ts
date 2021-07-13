import { Address } from '../../../types/user';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'NewUser', description: 'The username of User' })
  username: string;

  @ApiProperty({ example: '123321', description: 'The password of User' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'NewUser', description: 'The username of User' })
  username: string;

  @ApiProperty({ example: '123321', description: 'The password of User' })
  password: string;

  @ApiProperty({ example: 'Ivan', description: 'The name of User' })
  name: string;

  @ApiProperty({ example: true, description: 'Is User - seller' })
  seller?: boolean;

  @ApiProperty({ example: 'Address', description: 'Address' })
  address?: Address;

  @ApiProperty({ example: '+7(999)999-99-99', description: 'User phone' })
  phone: string;

  @ApiProperty({ example: 'vasily@takaya.ru', description: 'User email' })
  email?: string;

  @ApiProperty({ example: 'About me!!!', description: 'User description' })
  description?: string;
}
