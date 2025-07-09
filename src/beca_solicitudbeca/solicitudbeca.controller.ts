// src/beca_solicitudbeca/solicitudbeca.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common'; // Añadido Get
import { SolicitudBecaService } from './solicitudbeca.service';
import { CreateSolicitudBecaDto } from './dto/create-solicitudbeca.dto'; // Importa el DTO de creación

@Controller('solicitudbeca')
export class SolicitudBecaController {
  constructor(private readonly solicitudBecaService: SolicitudBecaService) {}

  // --- NUEVO: Ruta para crear una SolicitudBeca ---
  @Post() // Esta es la ruta para POST /solicitudbeca
  async create(@Body() createSolicitudBecaDto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.create(createSolicitudBecaDto);
  }

  // --- NUEVO: Ruta para obtener todas las SolicitudesBeca ---
  @Get() // Esta es la ruta para GET /solicitudbeca
  findAll() {
    return this.solicitudBecaService.findAll();
  }
}
