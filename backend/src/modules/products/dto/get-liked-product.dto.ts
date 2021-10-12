import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/types/product';

export class GetLikedProductDto {
  @ApiProperty({ example: 'Pants', description: 'The title of product' })
  likedProducts: Product[];
}
