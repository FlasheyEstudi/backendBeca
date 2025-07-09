// src/asignatura/asignatura.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { Carrera } from '../beca_carrera/entities/beca_carrera.entity'; // ¡RUTA CORREGIDA!

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asignatura,
      Carrera // Asegúrate de que Carrera esté aquí para que su repositorio pueda ser inyectado
    ])
  ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [TypeOrmModule, AsignaturaService], // Exporta el servicio si otros módulos lo necesitan
})
export class AsignaturaModule {}
