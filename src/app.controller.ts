import {
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private appService: AppService,
  ) {}

  @Get('pdf')
  async generatePdf(@Res() res) {
    const buffer = await this.appService.firstExample();
    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=pdf.pdf`,
      'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    res.end(buffer);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) //'file' debe ser el nombre que envies en el name por front
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        //Comprueba si el tipo MIME de un archivo dado coincide con el valor dado.
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({
            fileType: 'jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const response = await this.cloudinaryService.uploadImage(file);
    return {
      url: response.secure_url,
    };
  }

  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    files.forEach((file) => {
      this.cloudinaryService.uploadImage(file);
    });
  }
}
