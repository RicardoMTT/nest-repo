import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ReviewDto } from 'src/persona/dto/review.dto';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
// import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
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
}
