import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Product } from './product.entity';

@Entity('detalle')
export class Detalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column()
  precio: number;

  @Column()
  idPedido: number;

  @Column()
  idProducto: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Product, (product) => product.detalles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  producto: Product;
}
