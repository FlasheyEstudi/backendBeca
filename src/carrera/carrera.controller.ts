import { Controller, Get, Param } from '@nestjs/common';
import { CarreraService } from './carrera.service';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Get()
  findAll() {
    return this.carreraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(Number(id));
  }
}