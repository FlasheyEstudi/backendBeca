// src/beca_carrera/beca_carrera.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BecaCarreraService } from './beca_carrera.service'; // Importa el servicio
import { CreateCarreraDto } from './dto/beca_carrera.dto'; // Importa el DTO

@Controller('beca-carrera') // Define la ruta base para este controlador
export class BecaCarreraController {
  constructor(private readonly becaCarreraService: BecaCarreraService) {}

  @Post()
  async create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.becaCarreraService.create(createCarreraDto);
  }

  @Get()
  findAll() {
    return this.becaCarreraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaCarreraService.findOne(Number(id));
  }
}
