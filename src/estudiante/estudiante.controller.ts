import { Controller, Get, Post, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async save(@Body() createEstudianteDto: CreateEstudianteDto) {
    const result = await this.estudianteService.saveEstudiante(createEstudianteDto);
    return result;
  }

  @Get()
  async findAll() {
    return this.estudianteService.findAll();
  }
}