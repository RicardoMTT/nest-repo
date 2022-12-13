import { Body, Controller, Get, Post } from '@nestjs/common';
import { PhotosService } from './photo.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  addPhoto(@Body() body: any) {
    return this.photosService.addPhoto(body);
  }

  @Get()
  allPhotos() {
    return this.photosService.allPhotos();
  }
}
