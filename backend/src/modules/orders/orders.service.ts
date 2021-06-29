import { from, Observable } from 'rxjs';
import { User, UserDocument } from '../../models/user.schema';
import { Order, OrderDocument } from '../../models/order.schema';
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

  public async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await new this.orderModel(createOrderDto);
    return await newOrder.save();
  }

  public async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  public async findOne(id: number): Promise<Order> {
    return await this.orderModel.findById(id);
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  public async remove(id: number): Promise<Order> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
