// src/requisito/requisito.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisito } from './entities/requisito.entity';
import { BecaRequisitoController } from './requisito.controller'; // ¡CORREGIDO! Importa BecaRequisitoController
import { BecaRequisitoService } from './requisito.service'; // ¡CORREGIDO! Importa BecaRequisitoService
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Importa la entidad TipoBeca

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Requisito,
      TipoBeca // Añade TipoBeca aquí para que su repositorio pueda ser inyectado
    ])
  ],
  controllers: [BecaRequisitoController], // Declara el controlador
  providers: [BecaRequisitoService], // Declara el servicio
  exports: [TypeOrmModule, BecaRequisitoService], // Exporta el servicio si otros módulos lo necesitan
})
export class RequisitoModule {}
