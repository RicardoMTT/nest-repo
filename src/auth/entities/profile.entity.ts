import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    default: 'test',
  })
  genre: string;

  @OneToMany(() => Photo, (photo) => photo.profile)
  photos: Photo[];
}
