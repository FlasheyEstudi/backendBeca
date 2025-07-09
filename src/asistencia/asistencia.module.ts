// src/asistencia/asistencia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importa Estudiante
import { Asignatura } from '../asignatura/entities/asignatura.entity'; // Importa Asignatura
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // Importa PeriodoAcademico

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asistencia,
      Estudiante, // Añade Estudiante
      Asignatura, // Añade Asignatura
      PeriodoAcademico // Añade PeriodoAcademico
    ])
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  exports: [TypeOrmModule, AsistenciaService], // Exporta el servicio si otros módulos lo necesitan
})
export class AsistenciaModule {}
