// src/beca_carrera/beca_carrera.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/beca_carrera.entity';
import { BecaCarreraController } from './beca_carrera.controller';
import { BecaCarreraService } from './beca_carrera.service'; // ¡CORREGIDO! Importa BecaCarreraService

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  controllers: [BecaCarreraController],
  providers: [BecaCarreraService],
  exports: [TypeOrmModule, BecaCarreraService],
})
export class CarreraModule {}
