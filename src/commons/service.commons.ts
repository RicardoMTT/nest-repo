import { Repository } from 'typeorm';

export abstract class BaseService<T> {
  abstract getRepository(): Repository<T>;

  findAll(): Promise<T[]> {
    return this.getRepository().find();
  }

  findOne(id: any): Promise<T> {
    return this.getRepository().findOne(id);
  }

  save(entity: T): Promise<T> {
    return this.getRepository().save(entity);
  }
}
