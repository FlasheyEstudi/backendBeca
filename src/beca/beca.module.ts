// src/beca/beca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BecaService } from './beca.service';
import { BecaController } from './beca.controller';
import { Beca } from './entities/beca.entity'; // Importa la entidad Beca
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Importa TipoBeca

@Module({
  imports: [
    TypeOrmModule.forFeature([Beca, TipoBeca]), // Registra la entidad Beca y TipoBeca con TypeORM
  ],
  providers: [BecaService],
  controllers: [BecaController],
  exports: [BecaService, TypeOrmModule], // Exporta el servicio y el módulo TypeOrm si otros módulos lo necesitan
})
export class BecaModule {}
