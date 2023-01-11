import { Injectable, Logger } from '@nestjs/common';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import * as path from 'path';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // @Cron("5 * * * * *")
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // showEveryFiveSeconds() {
  //   this.logger.debug('Este mensaje se muestra cada 5 segundos');
  // }

  firstExample() {
    const filePath = path.join(process.cwd(), 'templates', 'pdf-profile.hbs');
    return createPdf(filePath);
  }
}
