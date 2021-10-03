import { UserDocument } from '@src/models/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Product, ProductDocument } from '@src/models/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_NOT_FOUND } from '@src/modules/products/products.constants';
import { USER_NOT_FOUND } from '@src/modules/users/users.constants';

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
    return this.productModel.find();
  }

  public async findAllByOwner(ownerId: string): Promise<Product[]> {
    return this.productModel.find({ owner: ownerId });
  }

  public async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  public async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  public async setImages(id, images: string[]) {
    return this.productModel.findByIdAndUpdate(id, { images }, { new: true });
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
    if (!productToLike.likes.find((id) => id === userId)) {
      productToLike.likes = [...productToLike.likes, userId];
      currentUser.followingProducts = [
        ...currentUser.followingProducts,
        productToLike.id,
      ];
      await this.userModel
        .findByIdAndUpdate(userId, currentUser as Document, { new: true })
        .exec();
      return await this.productModel
        .findByIdAndUpdate(productId, productToLike, { new: true })
        .exec();
    }
  }

  public async unlikeProduct(userId, productId) {
    const productToUnlike = await this.productModel.findById(productId);
    if (!productToUnlike) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }
    if (productToUnlike.likes.find((id) => id === productId)) {
      productToUnlike.likes = productToUnlike.likes.filter(
        (id) => id !== userId,
      );
      return await this.productModel
        .findByIdAndUpdate(productId, productToUnlike, { new: true })
        .exec();
    }
  }

  public async getLikedProducts(userId: string): Promise<Product[]> {
    const user = await this.userModel.findById(userId);
    const result = await this.productModel
      .find({ _id: { $in: user.followingProducts } })
      .exec();
    console.log(result);
    return result;
  }
}
