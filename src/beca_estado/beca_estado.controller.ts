// src/beca_estado/beca_estado.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Patch, Delete, HttpCode, HttpStatus
import { BecaEstadoService } from './beca_estado.service';
import { CreateBecaEstadoDto } from './dto/create-beca_estado.dto';
import { UpdateBecaEstadoDto } from './dto/update-beca_estado.dto'; // Importa el DTO de actualización

@Controller('beca-estado')
export class BecaEstadoController {
  constructor(private readonly becaEstadoService: BecaEstadoService) {}

  // Ruta para crear un estado
  @Post()
  async create(@Body() createBecaEstadoDto: CreateBecaEstadoDto) {
    return this.becaEstadoService.create(createBecaEstadoDto);
  }

  // Ruta para obtener todos los estados
  @Get()
  findAll() {
    return this.becaEstadoService.findAll();
  }

  // Ruta para obtener un estado por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaEstadoService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar un estado (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBecaEstadoDto: UpdateBecaEstadoDto) {
    return this.becaEstadoService.update(Number(id), updateBecaEstadoDto);
  }

  // --- NUEVO: Ruta para eliminar un estado (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.becaEstadoService.remove(Number(id));
  }
}
