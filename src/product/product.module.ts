import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoController } from './controllers/pedido.controller';
import { ProductController } from './controllers/product.controller';
import { ReviewController } from './controllers/review.controller';
import { Category } from './entities/category.entity';
import { Pedido } from './entities/pedido.entity';
import { Product } from './entities/product.entity';
import { PedidoService } from './services/pedido.service';
import { ProductService } from './services/product.service';
// import { Review } from './entities/review.entity';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Pedido])],
  controllers: [ReviewController, ProductController, PedidoController],
  providers: [ReviewsService, ProductService, PedidoService],
})
export class ProductModule {}
