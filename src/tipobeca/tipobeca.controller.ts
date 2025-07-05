import { Controller, Get, Param } from '@nestjs/common';
import { TipobecaService } from './tipobeca.service';

@Controller('tipobeca')
export class TipobecaController {
  constructor(private readonly tipobecaService: TipobecaService) {}

  @Get()
  findAll() {
    return this.tipobecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipobecaService.findOne(Number(id));
  }
}