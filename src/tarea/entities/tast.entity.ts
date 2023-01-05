import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tarea',
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contenido: string;
}
