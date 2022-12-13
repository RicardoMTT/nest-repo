import { Controller } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Task } from '../entities/tast.entity';
import { TareaService } from '../services/tarea.service';

@Controller('api/tarea')
export class TareaController extends BaseController<Task> {
  constructor(private readonly tareaService: TareaService) {
    super();
  }
  getService(): BaseService<Task> {
    return this.tareaService;
  }
}
