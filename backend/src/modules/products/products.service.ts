import { UserDocument } from '@src/models/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@src/models/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_NOT_FOUND } from "@src/modules/products/products.constants";
import { USER_NOT_FOUND } from "@src/modules/users/users.constants";

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

  public async likeProduct(userId: string, productId: string) {
    const productToLike = await this.productModel.findById(productId);
    const currentUser = await this.userModel.findById(userId);
    if (!productToLike) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }
    if (!currentUser) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    if (!productToLike.likes.find(id => id === productId)) {
      productToLike.likes = [...productToLike.likes, productId];
      return await this.productModel.findByIdAndUpdate(productId, productToLike).exec();
    }
  }

  public async unlikeProduct(userId, productId) {
    const productToUnlike = await this.productModel.findById(productId);
    const currentUser = await this.userModel.findById(userId);
    if (!productToUnlike) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }
    if (!currentUser) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    if (productToUnlike.likes.find(id => id === productId)) {
      productToUnlike.likes.filter(id => id !== productId);
      return await this.productModel.findByIdAndUpdate(productId, productToUnlike).exec();
    }
  }
}
