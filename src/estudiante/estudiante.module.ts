// src/estudiante/estudiante.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity'; // Importa Beca_Estado
import { Carrera } from '../beca_carrera/entities/beca_carrera.entity'; // Importa Carrera

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiante,
      Beca_Estado, // Añade Beca_Estado
      Carrera // Añade Carrera
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService], // Exporta el servicio si otros módulos lo necesitan
})
export class EstudianteModule {}
