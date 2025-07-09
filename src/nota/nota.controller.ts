// src/nota/nota.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Param, Patch, Delete, HttpCode, HttpStatus
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto'; // Importa el DTO de actualización

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    return this.notaService.create(createNotaDto);
  }

  @Get()
  findAll() {
    return this.notaService.findAll();
  }

  // --- NUEVO: Ruta para obtener una Nota por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar una Nota (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotaDto: UpdateNotaDto) {
    return this.notaService.update(Number(id), updateNotaDto);
  }

  // --- NUEVO: Ruta para eliminar una Nota (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.notaService.remove(Number(id));
  }
}
