import { Controller, Get, Post, Body } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  async save(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    const result = await this.asistenciaService.saveAsistencia(createAsistenciaDto);
    return result;
  }

  @Get()
  async findAll() {
    return this.asistenciaService.findAll();
  }
}