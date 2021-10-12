import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductSearchResult, ProductSearchBody } from '@src/types/product';

@Injectable()
export default class ProductsSearchService {
  index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(product: any) {
    return this.elasticsearchService.index<
      ProductSearchResult,
      ProductSearchBody
    >({
      index: this.index,
      body: {
        id: product.id,
        title: product.title,
        image: product.content,
        description: product.description,
        price: product.price,
      },
    });
  }

  async search(text: string) {
    const { body } =
      await this.elasticsearchService.search<ProductSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['title', 'content'],
            },
          },
        },
      });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
