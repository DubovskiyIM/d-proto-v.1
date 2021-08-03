import {
  Get, Post, Patch, Delete,
  Body, Controller, Param,
  UseGuards, UseInterceptors, UploadedFile,
  Req, Res
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

import { Product } from '@src/models/product.schema';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { IdValidationPipe } from "@src/pipes/id-validation.pipe";
import { RequestWithUser } from '@src/interfaces/requestWithUser.interface';

@Controller('products')
export class ProductsController {
  SERVER_URL:  string  =  "http://localhost:3001/";
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: RequestWithUser): Promise<Product> {
    req.body.owner = await req.user;
    return await this.productsService.createProduct(
      req.body as CreateProductDto,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findAllByOwner(@Param('id', IdValidationPipe) id: string): Promise<Product[]> {
    return await this.productsService.findAllByOwner(id);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get('product/:id')
  async findOne(@Param('id', IdValidationPipe) id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', IdValidationPipe) id: string): Promise<Product> {
    return await this.productsService.remove(id);
  }

  @Post(':id/product')
  @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './products',
          filename: (_req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      })
  )
  async uploadImages(
      @Param('id', IdValidationPipe) id: string,
      @UploadedFile() files: any[]): Promise<void> {
    const urls = files.map(file => `${this.SERVER_URL}${file.path}`)
    await this.productsService.setImages(id, urls);
  }

  @Get('product/:fileId')
  async serveImages(
      @Param('fileId', IdValidationPipe) fileId: string,
      @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'products' });
  }

  @Post(':id/like')
  async like(
      @Param('id', IdValidationPipe) id: string,
      @Req() req: RequestWithUser): Promise<void> {
    await this.productsService.likeProduct(req.user.id, id);
  }

  @Post(':id/unlike')
  async unlike(
      @Param('id', IdValidationPipe) id: string,
      @Req() req: RequestWithUser): Promise<void> {
    await this.productsService.unlikeProduct(req.user.id, id);
  }
}
