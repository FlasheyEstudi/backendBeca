import { Controller, Get } from '@nestjs/common';
import { PeriodoAcademicoService } from './periodoacademico.service';

@Controller('periodoacademico')
export class PeriodoAcademicoController {
  constructor(private readonly periodoAcademicoService: PeriodoAcademicoService) {}

  @Get()
  findAll() {
    return this.periodoAcademicoService.findAll();
  }
}