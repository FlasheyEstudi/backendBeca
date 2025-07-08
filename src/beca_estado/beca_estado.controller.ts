// src/beca_estado/beca_estado.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common'; // Añadido Post y Body
import { BecaEstadoService } from './beca_estado.service';
import { CreateBecaEstadoDto } from './dto/beca_estado.dto'; // Importar el DTO

@Controller('beca-estado')
export class BecaEstadoController {
  constructor(private readonly becaEstadoService: BecaEstadoService) {}

  // --- Método para manejar solicitudes POST ---
  @Post()
  async create(@Body() createBecaEstadoDto: CreateBecaEstadoDto) {
    return this.becaEstadoService.create(createBecaEstadoDto);
  }
  // --- Fin método create ---

  @Get()
  findAll() {
    return this.becaEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaEstadoService.findOne(Number(id));
  }
}
