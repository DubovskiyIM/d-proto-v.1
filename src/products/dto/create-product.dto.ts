import { ApiProperty } from '@nestjs/swagger';
import { Description } from '../../types/product';

export class CreateProductDto {
  @ApiProperty({ example: 'Pants', description: 'The title of product' })
  title: string;

  @ApiProperty({
    example: ['img1.img', 'img2.img', 'img3.img'],
    description: 'Array of images links',
  })
  images: string[];

  @ApiProperty({ example: 29990, description: 'The price of product' })
  price: number;

  @ApiProperty({ example: 'Available', description: 'The status of product' })
  status: string;

  @ApiProperty({ example: 'Casual', description: 'The style of product' })
  style: string;

  @ApiProperty({ example: 'Red', description: 'The color of product' })
  color: string;

  @ApiProperty({
    example: {
      owner: 123321,
      about: 'Info about product',
      sizes: ['XS', 'S', 'M'],
    },
    description: 'The description of product',
  })
  description: Description;
}
