import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post()
  async save(@Body() createCarreraDto: CreateCarreraDto) {
    const result = await this.carreraService.saveCarrera(createCarreraDto);
    return result;
  }

  @Get()
  async findAll() {
    return this.carreraService.findAll();
  }
}