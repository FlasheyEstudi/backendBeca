// src/tipobeca/tipobeca.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Patch, Delete, HttpCode, HttpStatus
import { TipoBecaService } from './tipobeca.service';
import { CreateTipoBecaDto } from './dto/create-tipobeca.dto';
import { UpdateTipoBecaDto } from './dto/update-tipobeca.dto'; // Importa el DTO de actualización

@Controller('tipo-beca')
export class TipoBecaController {
  constructor(private readonly tipoBecaService: TipoBecaService) {}

  @Post()
  async create(@Body() createTipoBecaDto: CreateTipoBecaDto) {
    return this.tipoBecaService.create(createTipoBecaDto);
  }

  @Get()
  findAll() {
    return this.tipoBecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoBecaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar un TipoBeca (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTipoBecaDto: UpdateTipoBecaDto) {
    return this.tipoBecaService.update(Number(id), updateTipoBecaDto);
  }

  // --- NUEVO: Ruta para eliminar un TipoBeca (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.tipoBecaService.remove(Number(id));
  }
}
