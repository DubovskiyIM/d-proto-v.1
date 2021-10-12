import { Document } from 'mongoose';
import { User } from './user';

export interface Description {
  about: string;
  sizes: string[];
  brand: string;
}

export interface Product extends Document {
  owner: User;
  title: string;
  image: string;
  description: Description;
  price: number;
  created: Date;
  availableQuantity: number;
}

export interface GetLikedProducts {
  likedProducts: Product[];
}

export interface ProductSearchBody {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
}

export interface ProductSearchResult {
  hits: {
    total: number;
    hits: Array<{ _source: ProductSearchBody }>;
  };
}
