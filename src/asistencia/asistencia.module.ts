import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Asistencia } from './entities/asistencia.entity';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { AsignaturaModule } from '../asignatura/asignatura.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asistencia]),
    EstudianteModule, // Proporciona EstudianteRepository
    AsignaturaModule, // Proporciona AsignaturaRepository
  ],
  providers: [AsistenciaService],
  controllers: [AsistenciaController],
})
export class AsistenciaModule {}