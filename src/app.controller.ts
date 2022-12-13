import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

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
