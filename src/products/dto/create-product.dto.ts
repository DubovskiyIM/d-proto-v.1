import { Description } from '../../types/product';

export class CreateProductDto {
  title: string;
  images: string[];
  price: number;
  status: string;
  style: string;
  color: string;
  description: Description;
}
