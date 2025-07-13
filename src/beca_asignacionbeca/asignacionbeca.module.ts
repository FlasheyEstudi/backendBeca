// src/beca_asignacionbeca/asignacionbeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionBecaController } from './asignacionbeca.controller';
import { BecaAsignacionBecaService } from './asignacionbeca.service';
import { BecaAsignacionBeca } from './entities/asignacionbeca.entity';
import { SolicitudBeca } from '../beca_solicitudbeca/entities/solicitudbeca.entity'; // Importa SolicitudBeca

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BecaAsignacionBeca,
      SolicitudBeca, // Registra SolicitudBeca para inyección en el servicio
    ]),
  ],
  controllers: [AsignacionBecaController],
  providers: [
    BecaAsignacionBecaService, // <--- Corrected: BecaAsignacionBecaService is now a provider
    // If you need custom repositories or other providers related to this module, list them here
  ],
  exports: [
    BecaAsignacionBecaService, // <--- Corrected: Now that it's provided, it can be exported
    // TypeOrmModule is typically not exported directly unless you have a very specific reason.
    // If other modules need to interact with BecaAsignacionBeca entities, they would import this module.
  ],
})
export class AsignacionBecaModule {}