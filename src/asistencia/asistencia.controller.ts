// src/asistencia/asistencia.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Param, Patch, Delete, HttpCode, HttpStatus
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto'; // Importa el DTO de actualización

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  // --- NUEVO: Ruta para obtener una Asistencia por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar una Asistencia (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(Number(id), updateAsistenciaDto);
  }

  // --- NUEVO: Ruta para eliminar una Asistencia (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.asistenciaService.remove(Number(id));
  }
}
