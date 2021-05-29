import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Observable<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Observable<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Order> {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Observable<Order> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<Order> {
    return this.ordersService.remove(+id);
  }
}
