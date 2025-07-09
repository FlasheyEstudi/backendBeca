// src/periodoacademico/periodoacademico.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoAcademico } from './entities/periodoacademico.entity';
import { PeriodoAcademicoController } from './periodoacademico.controller';
import { PeriodoAcademicoService } from './periodoacademico.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoAcademico])],
  controllers: [PeriodoAcademicoController],
  providers: [PeriodoAcademicoService],
  exports: [TypeOrmModule, PeriodoAcademicoService], // Exporta el servicio si otros módulos lo necesitan
})
export class PeriodoAcademicoModule {}
