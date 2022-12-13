import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PersonaModule } from './persona/persona.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TareaModule } from './tarea/tarea.module';
import { Task } from './tarea/entities/tast.entity';
import { Persona } from './persona/entities/persona.entity';
import { User } from './auth/entities/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Photo } from './auth/entities/photo.entity';
import { Category } from './product/entities/category.entity';
import { Pedido } from './product/entities/pedido.entity';
import { Profile } from './auth/entities/profile.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '',//si el .env esta en otro lugar que no es el root aca puedes configurarlo
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }), //will load and parse a .env file from the default location
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME_API,
      password: process.env.PASSWORD_API,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      database: 'block',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TareaModule,
    PersonaModule,
    AuthModule,
    ProductModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, CloudinaryProvider],
})
export class AppModule {}
