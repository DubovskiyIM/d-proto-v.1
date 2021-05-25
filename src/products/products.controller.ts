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
import { Observable } from 'rxjs';
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
  create(@Req() req: RequestWithUser): Observable<Product> {
    req.body.owner = req.user;
    return this.productsService.createProduct(req.body as CreateProductDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findAllByOwner(@Param('id') id: string): Observable<Product[]> {
    return this.productsService.findAllByOwner(id);
  }

  @Get()
  findAll(): Observable<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<Product> {
    return this.productsService.remove(+id);
  }
}
