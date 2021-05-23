import { User, UserDocument } from '../models/user.schema';
import { Order, OrderDocument } from '../models/order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel('Product') private productModel: Model<OrderDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const owner = (await this.userModel.findOne({
      username: 'username',
    })) as User;
    const newOrder = new this.orderModel(createOrderDto);
    newOrder.owner = owner;
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderModel.findById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  async remove(id: number): Promise<Order> {
    return this.orderModel.findByIdAndRemove(id);
  }
}
