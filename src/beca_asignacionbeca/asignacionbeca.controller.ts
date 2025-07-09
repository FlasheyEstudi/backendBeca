// src/beca_asignacionbeca/asignacionbeca.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Patch, Delete, HttpCode, HttpStatus
import { AsignacionBecaService } from './asignacionbeca.service';
import { CreateAsignacionBecaDto } from './dto/create-asignacionbeca.dto'; // Importa el DTO de creación
import { UpdateAsignacionBecaDto } from './dto/update-asignacionbeca.dto'; // Importa el DTO de actualización

@Controller('asignacionbeca')
export class AsignacionBecaController {
  constructor(private readonly asignacionBecaService: AsignacionBecaService) {}

  // Ruta para crear una AsignacionBeca
  @Post() // Esta es la ruta para POST /asignacionbeca
  async create(@Body() createAsignacionBecaDto: CreateAsignacionBecaDto) {
    return this.asignacionBecaService.create(createAsignacionBecaDto);
  }

  // Ruta para obtener todas las AsignacionesBeca
  @Get() // Esta es la ruta para GET /asignacionbeca
  findAll() {
    return this.asignacionBecaService.findAll();
  }

  // --- Ruta para obtener una AsignacionBeca por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionBecaService.findOne(Number(id));
  }

  // --- Ruta para actualizar una AsignacionBeca (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAsignacionBecaDto: UpdateAsignacionBecaDto) {
    return this.asignacionBecaService.update(Number(id), updateAsignacionBecaDto);
  }

  // --- Ruta para eliminar una AsignacionBeca (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.asignacionBecaService.remove(Number(id));
  }
}
