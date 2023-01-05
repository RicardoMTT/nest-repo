import { Body, Controller, Post, Req } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('api/pedido')
export class PedidoController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/create')
  async createPedido(@Body() body: any[], @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt) as any;
    const userId = json.id;

    return this.pedidoService.createTest(body, userId);
  }
}
