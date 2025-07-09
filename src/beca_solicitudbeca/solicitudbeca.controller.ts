// src/beca_solicitudbeca/solicitudbeca.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // ¡Añadidos Param, Patch, Delete, HttpCode, HttpStatus!
import { SolicitudBecaService } from './solicitudbeca.service';
import { CreateSolicitudBecaDto } from './dto/create-solicitudbeca.dto';
import { UpdateSolicitudBecaDto } from './dto/update-solicitudbeca.dto'; // Importa el DTO de actualización

@Controller('solicitudbeca')
export class SolicitudBecaController {
  constructor(private readonly solicitudBecaService: SolicitudBecaService) {}

  @Post()
  async create(@Body() createSolicitudBecaDto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.create(createSolicitudBecaDto);
  }

  @Get()
  findAll() {
    return this.solicitudBecaService.findAll();
  }

  // --- NUEVO: Ruta para obtener una SolicitudBeca por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudBecaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar una SolicitudBeca (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSolicitudBecaDto: UpdateSolicitudBecaDto) {
    return this.solicitudBecaService.update(Number(id), updateSolicitudBecaDto);
  }

  // --- NUEVO: Ruta para eliminar una SolicitudBeca (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.solicitudBecaService.remove(Number(id));
  }
}
