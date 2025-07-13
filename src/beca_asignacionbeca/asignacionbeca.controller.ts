import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { BecaAsignacionBecaService } from './asignacionbeca.service'; // Corrección aquí
import { CreateAsignacionBecaDto } from './dto/create-asignacionbeca.dto';
import { UpdateAsignacionBecaDto } from './dto/update-asignacionbeca.dto';

@Controller('beca-asignacionbeca')
export class AsignacionBecaController {
  constructor(private readonly becaAsignacionService: BecaAsignacionBecaService) {}

  @Post()
  async create(@Body() createAsignacionBecaDto: CreateAsignacionBecaDto) {
    return this.becaAsignacionService.create(createAsignacionBecaDto);
  }

  @Get()
  findAll() {
    return this.becaAsignacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaAsignacionService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAsignacionBecaDto: UpdateAsignacionBecaDto) {
    return this.becaAsignacionService.update(Number(id), updateAsignacionBecaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.becaAsignacionService.remove(Number(id));
  }
}