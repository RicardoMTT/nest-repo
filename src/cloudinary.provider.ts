import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (): void => {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_APIKEY,
      api_secret: process.env.CLOUDINARY_SECRETKEY,
    });
  },
};
