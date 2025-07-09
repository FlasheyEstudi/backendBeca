// src/estudiante/estudiante.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Param, Patch, Delete, HttpCode, HttpStatus
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto'; // Importa el DTO de actualización

@Controller('estudiante')
export class EstudianteController {
  // Constructor para inyectar EstudianteService
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  // --- NUEVO: Ruta para obtener un Estudiante por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar un Estudiante (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(Number(id), updateEstudianteDto);
  }

  // --- NUEVO: Ruta para eliminar un Estudiante (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.estudianteService.remove(Number(id));
  }
}
