import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/commons/service.commons';
import { Repository } from 'typeorm';
import { Task } from '../entities/tast.entity';

@Injectable()
export class TareaService extends BaseService<Task> {
  constructor(@InjectRepository(Task) private tareaRepo: Repository<Task>) {
    super();
  }

  getRepository(): Repository<Task> {
    return this.tareaRepo;
  }
}
