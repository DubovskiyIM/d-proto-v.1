import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../models/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: RequestWithUser): Promise<Product> {
    req.body.owner = req.user;
    return this.productsService.createProduct(req.body as CreateProductDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findAllByOwner(@Param('id') id: string): Promise<Product[]> {
    return await this.productsService.findAllByOwner(id);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(+id);
  }
}
