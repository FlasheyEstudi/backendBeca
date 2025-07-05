import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../carrera/entities/carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Beca_Estado, Carrera])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}