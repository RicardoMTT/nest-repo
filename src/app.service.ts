import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // @Cron("5 * * * * *")
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // showEveryFiveSeconds() {
  //   this.logger.debug('Este mensaje se muestra cada 5 segundos');
  // }
}
