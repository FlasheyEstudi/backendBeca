// src/nota/nota.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { NotaController } from './nota.controller';
import { NotaService } from './nota.service';
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importa Estudiante
import { Asignatura } from '../asignatura/entities/asignatura.entity'; // Importa Asignatura
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // Importa PeriodoAcademico

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Nota,
      Estudiante, // Añade Estudiante
      Asignatura, // Añade Asignatura
      PeriodoAcademico // Añade PeriodoAcademico
    ])
  ],
  controllers: [NotaController],
  providers: [NotaService],
  exports: [TypeOrmModule, NotaService], // Exporta el servicio si otros módulos lo necesitan
})
export class NotaModule {}
