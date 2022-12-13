import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaController } from './controllers/tarea.controller';
import { Task } from './entities/tast.entity';
import { TareaService } from './services/tarea.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TareaService],
  controllers: [TareaController],
  exports: [TypeOrmModule],
})
export class TareaModule {}
