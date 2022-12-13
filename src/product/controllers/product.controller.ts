import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(@Body() body: ProductDto) {
    return this.productService.saveProduct(body);
  }

  @Get('/all')
  async allProducts() {
    return this.productService.getProducts();
  }
}
