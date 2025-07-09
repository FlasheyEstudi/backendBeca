// src/beca_estado/beca_estado.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beca_Estado } from './entities/beca_estado.entity';
import { BecaEstadoController } from './beca_estado.controller';
import { BecaEstadoService } from './beca_estado.service'; // ¡IMPORTE AÑADIDO!

@Module({
  imports: [TypeOrmModule.forFeature([Beca_Estado])],
  controllers: [BecaEstadoController],
  providers: [BecaEstadoService],
  exports: [TypeOrmModule, BecaEstadoService], // Exporta el servicio si otros módulos lo necesitan
})
export class BecaEstadoModule {}
