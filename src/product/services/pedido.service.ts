import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async createPedido(body: any) {
    const pedidos = body;
    const pedidoInstance = new Pedido();
    const productsIds = [];
    pedidos.forEach(async (item: any) => {
      productsIds.push(item.product_id);
      pedidoInstance.price = item.price;
      pedidoInstance.quantity = item.quantity;
      pedidoInstance.product = productsIds;
      await this.pedidoRepository.save(pedidoInstance);
    });

    return {
      ok: true,
    };
  }
}
