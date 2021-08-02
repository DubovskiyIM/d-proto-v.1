import { UserDocument } from '@src/models/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@src/models/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const createdProduct = await new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  public async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  public async findAllByOwner(ownerId: string): Promise<Product[]> {
    return await this.productModel.find({ owner: ownerId });
  }

  public async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  public async remove(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
  }

  public async setImages(id, images: string[]){
    return await this.productModel.findByIdAndUpdate(id, { images });
  }
}
