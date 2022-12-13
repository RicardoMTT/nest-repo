import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async addPhoto(data: any) {
    const profile = await this.profileRepo.findOne({
      where: {
        id: data.profileId,
      },
    });
    const newPhoto = new Photo();
    newPhoto.url = data.url;
    newPhoto.profile = profile;
    return this.photoRepo.save(newPhoto);
  }

  allPhotos() {
    return this.photoRepo.find();
  }
}
