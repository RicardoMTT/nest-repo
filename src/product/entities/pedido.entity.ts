import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'pedidos_products',
    joinColumn: {
      name: 'pedido_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    },
  })
  product: Product[];

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;
}
