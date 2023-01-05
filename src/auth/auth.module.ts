import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photo.service';
import { PhotosController } from './photo.controller';

@Module({
  controllers: [AuthController, PhotosController],
  providers: [AuthService, JwtStrategy, PhotosService],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([User, Photo, Profile]), // Con esto podemos injectar los repositorios en los services usando @InjectRepository()

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: 'secret',
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule], //TypeOrmModule para usar el repositorio en otro module
})
export class AuthModule {}
