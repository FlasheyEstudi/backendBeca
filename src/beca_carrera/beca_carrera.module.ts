// src/beca_carrera/beca_carrera.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/beca_carrera.entity'; // ¡Importa la entidad Carrera con el nombre correcto!
import { BecaCarreraController } from './beca_carrera.controller'; // Importa el controlador
import { BecaCarreraService } from './beca_carrera.service'; // Importa el servicio

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])], // Asegura que la entidad Carrera esté listada
  controllers: [BecaCarreraController], // Declara el controlador
  providers: [BecaCarreraService], // Declara el servicio
  exports: [TypeOrmModule, BecaCarreraService], // Exporta el servicio si otros módulos lo necesitan
})
export class CarreraModule {}
