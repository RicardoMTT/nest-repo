import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ReviewDto } from 'src/persona/dto/review.dto';
import { Repository } from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';
// import { Review } from '../entities/review.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async saveReview(id: number, body: any) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    console.log(product, id);
    // if (product) {
    //   const review = this.reviewRepository.create(body);
    //   console.log('review', review);

    //   //   review.product = product;
    //   //   await this.reviewRepository.save(review);
    //   return review;
    // }
    throw new NotFoundException(`No encontramos el producto ${id}`);
  }

  async saveProduct(body) {
    const response = await this.productsRepository.save(body);

    console.log('response', response);

    return {
      ok: true,
    };
  }
  async getProducts() {
    const products = await this.productsRepository.find({
      relations: ['category'],
    });
    return products;
  }
}
