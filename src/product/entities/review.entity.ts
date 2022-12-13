import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

// @Entity('reviews')
// export class Review {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Product, (product) => product.reviews)
//   @JoinColumn({ name: 'product_id' })
//   product: Product;
// }
