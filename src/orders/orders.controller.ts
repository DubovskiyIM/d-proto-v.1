import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Order } from 'src/models/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order | undefined>  {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<Order[] | undefined>  {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order | undefined>  {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order | undefined>  {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Order | undefined>  {
    return this.ordersService.remove(+id);
  }
}
