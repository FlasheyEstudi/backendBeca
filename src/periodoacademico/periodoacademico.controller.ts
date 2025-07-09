// src/periodoacademico/periodoacademico.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Param, Patch, Delete, HttpCode, HttpStatus
import { PeriodoAcademicoService } from './periodoacademico.service';
import { CreatePeriodoAcademicoDto } from './dto/create-periodoacademico.dto';
import { UpdatePeriodoAcademicoDto } from './dto/update-periodoacademico.dto'; // Importa el DTO de actualización

@Controller('periodoacademico')
export class PeriodoAcademicoController {
  constructor(private readonly periodoAcademicoService: PeriodoAcademicoService) {}

  @Post()
  async create(@Body() createPeriodoAcademicoDto: CreatePeriodoAcademicoDto) {
    return this.periodoAcademicoService.create(createPeriodoAcademicoDto);
  }

  @Get()
  findAll() {
    return this.periodoAcademicoService.findAll();
  }

  // --- NUEVO: Ruta para obtener un PeriodoAcademico por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodoAcademicoService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar un PeriodoAcademico (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePeriodoAcademicoDto: UpdatePeriodoAcademicoDto) {
    return this.periodoAcademicoService.update(Number(id), updatePeriodoAcademicoDto);
  }

  // --- NUEVO: Ruta para eliminar un PeriodoAcademico (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.periodoAcademicoService.remove(Number(id));
  }
}
