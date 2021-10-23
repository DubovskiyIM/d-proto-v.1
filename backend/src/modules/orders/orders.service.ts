import { User, UserDocument } from '@src/models/user.schema';
import { Order, OrderDocument } from '@src/models/order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  public async create(createOrderDto: any): Promise<any> {
    const newOrder = new this.orderModel(createOrderDto);
    return await newOrder.save();
  }

  public async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  public async findOne(id: number): Promise<Order> {
    return await this.orderModel.findById(id);
  }

  public async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  public async remove(id: number): Promise<Order> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
