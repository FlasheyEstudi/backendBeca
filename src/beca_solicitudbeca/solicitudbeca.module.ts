// src/beca_solicitudbeca/solicitudbeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudBecaService } from './solicitudbeca.service';
import { SolicitudBecaController } from './solicitudbeca.controller';
import { SolicitudBeca } from './entities/solicitudbeca.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importa Estudiante
import { Beca } from '../beca/entities/beca.entity'; // Importa Beca
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // Importa PeriodoAcademico

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudBeca,
      Estudiante, // Asegúrate de que Estudiante esté aquí
      Beca,       // Asegúrate de que Beca esté aquí
      PeriodoAcademico // ¡CRUCIAL! Asegúrate de que PeriodoAcademico esté aquí
    ]),
  ],
  controllers: [SolicitudBecaController],
  providers: [SolicitudBecaService],
  exports: [SolicitudBecaService] // Exporta el servicio si otros módulos lo van a usar
})
export class SolicitudBecaModule {}
