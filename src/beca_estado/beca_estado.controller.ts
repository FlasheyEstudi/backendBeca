import { Controller, Get, Param } from '@nestjs/common';
import { BecaEstadoService } from './beca_estado.service';

@Controller('beca-estado')
export class BecaEstadoController {
  constructor(private readonly becaEstadoService: BecaEstadoService) {}

  @Get()
  findAll() {
    return this.becaEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaEstadoService.findOne(Number(id));
  }
}