import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Photo } from './entities/photo.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    private readonly jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      // TODO recibir foto
      const profile = await this.profileRepo.create({
        genre: userData.genre,
        ...userData,
      });
      const newProfile = await this.profileRepo.save(profile);

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: ['user'],
        profile: newProfile,
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
      // TODO: Retornar el JWT de acceso
    } catch (error) {
      console.log('errror', error);

      this.handleDBErrors(error);
    }
  }

  async getPhotosByProfile(userId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['profile'],
    });

    const res = await this.photoRepo.find({
      where: {
        profile: user.profile,
      },
    });
    return {
      photos: res,
    };
  }

  async getUser(userId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['profile'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      user,
    };
  }
  async updateUser(updateUserDto: UpdateUserDto, file, userId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['profile'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const photo = new Photo();

    const response = await this.cloudinaryService.uploadImage(file);
    photo.url = response.secure_url;
    photo.profile = user.profile;

    const newPhotoInstance = await this.photoRepo.create(photo);

    await this.photoRepo.save(newPhotoInstance);

    const editedUser = Object.assign(user, updateUserDto);

    const editedUserSave = await this.userRepository.save(editedUser);

    return {
      ok: true,
      user: editedUserSave,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }, //! OJO!
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload); // Generacion del token (JWT)
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Please check server logs');
  }
}
