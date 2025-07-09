// src/beca_asignacionbeca/asignacionbeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { AsignacionBecaController } from './asignacionbeca.controller';
import { AsignacionBecaService } from './asignacionbeca.service'; // ¡IMPORTE AÑADIDO!
import { AsignacionBeca } from './entities/asignacionbeca.entity'; // Importa la entidad AsignacionBeca
import { SolicitudBeca } from '../beca_solicitudbeca/entities/solicitudbeca.entity'; // Importa SolicitudBeca

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AsignacionBeca,
      SolicitudBeca, // Registra SolicitudBeca para inyección en el servicio
    ]),
  ],
  controllers: [AsignacionBecaController],
  providers: [AsignacionBecaService],
  exports: [TypeOrmModule, AsignacionBecaService], // Exporta el servicio y el módulo TypeOrm si otros módulos lo necesitan
})
export class AsignacionBecaModule {}
