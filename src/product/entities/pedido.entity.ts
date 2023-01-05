import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Detalle } from './detalle.entity';
import { Product } from './product.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToMany(() => Product, (product) => product.category)
  // @JoinTable({
  //   name: 'pedidos_products',
  //   joinColumn: {
  //     name: 'pedido_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //   },
  // })
  // products: Product[];

  @OneToMany(() => Detalle, (detalle) => detalle.pedido)
  detalles: Detalle[];

  @ManyToOne(() => User, (user) => user.pedidos)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @Column()
  fechaPedido: string;
}
