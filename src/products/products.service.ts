import { User, UserDocument } from '../models/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../models/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const owner = (await this.userModel.findOne({
      username: 'username2',
    })) as User;
    const createdProduct = new this.productModel(createProductDto);
    createdProduct.owner = owner;
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: number): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
