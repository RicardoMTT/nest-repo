import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  async allProducts() {
    return this.productService.getProducts();
  }

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.saveProduct(body);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param(':id') id: string) {
    this.productService.deleteProduct(id);
  }
}
