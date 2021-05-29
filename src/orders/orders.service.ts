import { from, Observable } from 'rxjs';
import { User, UserDocument } from '../models/user.schema';
import { Order, OrderDocument } from '../models/order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  create(createOrderDto: CreateOrderDto): Observable<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    return from(newOrder.save());
  }

  findAll(): Observable<Order[]> {
    return from(this.orderModel.find());
  }

  findOne(id: number): Observable<Order> {
    return from(this.orderModel.findById(id));
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Observable<Order> {
    return from(this.orderModel.findByIdAndUpdate(id, updateOrderDto));
  }

  remove(id: number): Observable<Order> {
    return from(this.orderModel.findByIdAndRemove(id));
  }
}
