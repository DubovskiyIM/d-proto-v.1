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
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { RequestWithUser } from '@src/interfaces/requestWithUser.interface';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@src/models/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  // @UseGuards(JwtAuthGuard)
  async create(@Req() req: RequestWithUser): Promise<Product> {
    req.body.owner = await req.user;
    return await this.productsService.createProduct(
      req.body as CreateProductDto,
    );
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findAllByOwner(@Param('id') id: string): Promise<Product[]> {
    return await this.productsService.findAllByOwner(id);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get('product/:id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(id);
  }
}
