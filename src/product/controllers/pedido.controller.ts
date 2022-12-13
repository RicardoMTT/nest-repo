import { Body, Controller, Post } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';

@Controller('api/pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post('/create')
  async createPedido(@Body() body: any) {
    return this.pedidoService.createPedido(body);
  }
}
