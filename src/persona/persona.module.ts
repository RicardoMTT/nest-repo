import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaController } from './controllers/persona.controller';
import { Persona } from './entities/persona.entity';
import { PersonaService } from './services/persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  providers: [PersonaService],
  controllers: [PersonaController],
  exports: [TypeOrmModule],
})
export class PersonaModule {}
