// src/asignatura/asignatura.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Patch, Delete, HttpCode, HttpStatus
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto'; // Importa el DTO de actualización

@Controller('asignatura')
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post()
  async create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  @Get()
  findAll() {
    return this.asignaturaService.findAll();
  }

  // --- NUEVO: Ruta para obtener una Asignatura por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignaturaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar una Asignatura (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto) {
    return this.asignaturaService.update(Number(id), updateAsignaturaDto);
  }

  // --- NUEVO: Ruta para eliminar una Asignatura (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.asignaturaService.remove(Number(id));
  }
}
