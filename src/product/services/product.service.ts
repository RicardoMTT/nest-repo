import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ReviewDto } from 'src/persona/dto/review.dto';
import { Repository } from 'typeorm';
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
    // if (product) {
    //   const review = this.reviewRepository.create(body);

    //   //   review.product = product;
    //   //   await this.reviewRepository.save(review);
    //   return review;
    // }
    throw new NotFoundException(`No encontramos el producto ${id}`);
  }

  async saveProduct(body) {
    const product = await this.productsRepository.create(body);

    await this.productsRepository.save(product);
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

  async getProductById(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
    return product;
  }

  async updateProduct(id, productArg) {
    const xd = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    const product = await this.productsRepository.preload({
      id,
      ...productArg,
    });

    if (!product) {
      throw new NotFoundException('product not exist');
    }

    try {
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async deleteProduct(id) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('product not exist');
    }

    try {
      await this.productsRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }
}
