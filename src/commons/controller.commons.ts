import { Body, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BaseService } from './service.commons';

export abstract class BaseController<T> {
  abstract getService(): BaseService<T>;

  @Get('all')
  findAll(): Promise<T[]> {
    return this.getService().findAll();
  }

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() entity: T): Promise<T> {
    return await this.getService().save(entity);
  }
}
