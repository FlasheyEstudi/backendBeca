// src/tipobeca/tipobeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoBeca } from './entities/tipobeca.entity';
import { TipoBecaController } from './tipobeca.controller';
import { TipoBecaService } from './tipobeca.service'; // ¡IMPORTE AÑADIDO!

@Module({
  imports: [TypeOrmModule.forFeature([TipoBeca])], // Asegura que la entidad TipoBeca esté listada
  controllers: [TipoBecaController], // Declara el controlador
  providers: [TipoBecaService], // Declara el servicio
  exports: [TypeOrmModule, TipoBecaService], // Exporta el servicio si otros módulos lo necesitan
})
export class TipoBecaModule {}
