import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Detalle } from '../entities/detalle.entity';
import { Pedido } from '../entities/pedido.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Detalle) private detalleRepository: Repository<Detalle>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createTest(cart: any, userId) {
    for (const item of cart) {
      const pedido = new Pedido();
      const date = new Date();
      pedido.fechaPedido = date.toISOString();
      const userFound = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      pedido.usuario = userFound;
      const newPedido = await this.pedidoRepository.save(pedido);

      const newProduct = await this.productRepository.findOne({
        where: {
          id: item.product,
        },
      });

      const detalle = new Detalle();
      detalle.cantidad = item.quantity;
      detalle.precio = item.price;
      detalle.producto = newProduct;
      detalle.pedido = newPedido;
      detalle.idPedido = newPedido.id;
      detalle.idProducto = item.product;

      await this.detalleRepository.save(detalle);
    }

    return {
      ok: true,
      msg: 'productos agregados correctamente',
    };
  }
}
