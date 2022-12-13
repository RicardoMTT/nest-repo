import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
// import { ReviewDto } from 'src/persona/dto/review.dto';
import { ReviewsService } from '../services/reviews.service';

@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post(':id/review')
  async createReview(
    @Param('id', ParseIntPipe) id: number,
    // @Body() body: ReviewDto,
  ) {
    return this.reviewsService.saveReview(id, {});
  }
}
