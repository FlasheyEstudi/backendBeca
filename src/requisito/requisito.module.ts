// src/requisito/requisito.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisito } from './entities/requisito.entity';
import { BecaRequisitoController } from './requisito.controller';
import { BecaRequisitoService } from './requisito.service';
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Import TipoBeca

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Requisito,
      TipoBeca // Add TipoBeca here so its repository can be injected
    ])
  ],
  controllers: [BecaRequisitoController],
  providers: [BecaRequisitoService],
  exports: [TypeOrmModule, BecaRequisitoService], // Export the service if other modules need it
})
export class RequisitoModule {}
