import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  async save(@Body() createNotaDto: CreateNotaDto) {
    const result = await this.notaService.saveNota(createNotaDto);
    return result;
  }

  @Get()
  async findAll() {
    return this.notaService.findAll();
  }
}