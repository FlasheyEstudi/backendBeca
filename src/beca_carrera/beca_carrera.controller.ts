// src/beca_carrera/beca_carrera.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BecaCarreraService } from './beca_carrera.service'; // ¡CORREGIDO! Importa BecaCarreraService
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller('beca-carrera')
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.becaCarreraService.update(Number(id), updateCarreraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.becaCarreraService.remove(Number(id));
  }
}
