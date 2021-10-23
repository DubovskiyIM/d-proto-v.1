import { Product } from '@src/types/product';
import { User } from '@src/types/user';
import { Feedback } from '@src/types/feedback';

enum OrderStatus {
  'PENDING',
  'SENDED',
  'DELIVERED',
  'CLOSED',
  'CANCELED',
}

export class CreateOrderDto {
  public id: string;
  public createdAt: Date;
  public cart: Product[];
  public trackId: string;
  public seller: User;
  public buyer: User;
  public status: OrderStatus;
  public feedback: Feedback;

  private trackNumber: string;
  private buyerId: string;
  private products: string[];

  constructor() {}
}
