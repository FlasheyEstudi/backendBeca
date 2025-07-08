// src/tipobeca/tipobeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoBeca } from './entities/tipobeca.entity'; // Importa la entidad TipoBeca
import { TipoBecaController } from './tipobeca.controller'; // ¡CORREGIDO! Importa TipoBecaController
import { TipoBecaService } from './tipobeca.service'; // ¡CORREGIDO! Importa TipoBecaService

@Module({
  imports: [TypeOrmModule.forFeature([TipoBeca])], // Asegura que la entidad TipoBeca esté listada
  controllers: [TipoBecaController], // Declara el controlador
  providers: [TipoBecaService], // Declara el servicio
  exports: [TypeOrmModule, TipoBecaService], // Exporta el servicio si otros módulos lo necesitan
})
export class TipoBecaModule {}