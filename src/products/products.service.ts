import { from, Observable } from 'rxjs';
import { UserDocument } from '../models/user.schema';
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

  createProduct(createProductDto: CreateProductDto): Observable<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return from(createdProduct.save());
  }

  findAll(): Observable<Product[]> {
    return from(this.productModel.find());
  }

  findAllByOwner(ownerId: string): Observable<Product[]> {
    return from(this.productModel.find({ owner: ownerId }));
  }

  findOne(id: number): Observable<Product> {
    return from(this.productModel.findById(id));
  }

  update(id: number, updateProductDto: UpdateProductDto): Observable<Product> {
    return from(this.productModel.findByIdAndUpdate(id, updateProductDto));
  }

  remove(id: number): Observable<Product> {
    return from(this.productModel.findByIdAndRemove(id));
  }
}
