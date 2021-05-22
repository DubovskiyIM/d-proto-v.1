import { Description } from "../../types/product";
import { User } from "../../types/user";

export class CreateProductDto {
  title: string;
  images: string[];
  price: number;
  status: string;
  style: string;
  color: string;
  description: Description
}
