// src/beca_solicitudbeca/solicitudbeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { SolicitudBecaController } from './solicitudbeca.controller';
import { SolicitudBecaService } from './solicitudbeca.service'; // ¡IMPORTE AÑADIDO!
import { SolicitudBeca } from './entities/solicitudbeca.entity'; // Importa la entidad SolicitudBeca
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importa Estudiante
import { Beca } from '../beca/entities/beca.entity'; // Importa Beca

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudBeca,
      Estudiante, // Registra Estudiante para inyección en el servicio
      Beca,       // Registra Beca para inyección en el servicio
    ]),
  ],
  controllers: [SolicitudBecaController],
  providers: [SolicitudBecaService],
  exports: [TypeOrmModule, SolicitudBecaService], // Exporta el servicio y el módulo TypeOrm si otros módulos lo necesitan
})
export class SolicitudBecaModule {}
