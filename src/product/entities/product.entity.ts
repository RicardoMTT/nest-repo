import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Detalle } from './detalle.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  // @ManyToMany(() => Pedido, (pedido) => pedido.products)
  // pedidos: Pedido[];

  @OneToMany(() => Detalle, (detalle) => detalle.pedido)
  detalles: Detalle[];

  @Column()
  descripcion: string;

  @Column()
  color: string;
}
