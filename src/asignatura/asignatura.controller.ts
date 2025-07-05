import { Controller, Get, Post, Body } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';

@Controller('asignatura') // Asegúrate de que esta línea esté presente
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post() // Método POST para crear asignatura
  async save(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    const result = await this.asignaturaService.saveAsignatura(createAsignaturaDto);
    return result;
  }

  @Get() // Método GET para listar asignaturas
  async findAll() {
    return this.asignaturaService.findAll();
  }
}