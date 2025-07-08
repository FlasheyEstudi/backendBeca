// src/tipobeca/tipobeca.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common'; // Añadido Post y Body
import { TipoBecaService } from './tipobeca.service'; // Importa el servicio
import { CreateTipoBecaDto } from './dto/create-tipobeca-dto'; // Importa el DTO

@Controller('tipo-beca') // Define la ruta base para este controlador
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
}
