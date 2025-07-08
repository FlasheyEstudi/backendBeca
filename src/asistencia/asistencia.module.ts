// src/asistencia/asistencia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // ¡Importar!

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asistencia,
      Estudiante,
      Asignatura,
      PeriodoAcademico // ¡Añadir aquí!
    ])
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}