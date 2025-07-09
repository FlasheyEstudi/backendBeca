// src/periodoacademico/periodoacademico.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common'; // Añadido Post y Body
import { PeriodoAcademicoService } from './periodoacademico.service';
import { CreatePeriodoAcademicoDto } from './dto/create-periodoacademico.dto'; // Importa el DTO

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
}
