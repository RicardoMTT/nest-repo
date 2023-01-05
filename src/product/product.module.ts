import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PedidoController } from './controllers/pedido.controller';
import { ProductController } from './controllers/product.controller';
import { ReviewController } from './controllers/review.controller';
import { Category } from './entities/category.entity';
import { Detalle } from './entities/detalle.entity';
import { Pedido } from './entities/pedido.entity';
import { Product } from './entities/product.entity';
import { PedidoService } from './services/pedido.service';
import { ProductService } from './services/product.service';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Pedido, Detalle, User]),
  ],
  controllers: [ReviewController, ProductController, PedidoController],
  providers: [ReviewsService, ProductService, PedidoService, JwtService],
})
export class ProductModule {}
