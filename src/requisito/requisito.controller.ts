    // src/beca_requisito/beca_requisito.controller.ts
    import { Controller, Get, Post, Body, Param } from '@nestjs/common';
    import { BecaRequisitoService } from './requisito.service'; // Importa el servicio
    import { CreateRequisitoDto } from './dto/create-requisito.dto'; // Importa el DTO

    @Controller('beca-requisito') // Esta línea define la URL base para este controlador
    export class BecaRequisitoController {
      constructor(private readonly becaRequisitoService: BecaRequisitoService) {}

      @Post()
      async create(@Body() createRequisitoDto: CreateRequisitoDto) {
        return this.becaRequisitoService.create(createRequisitoDto);
      }

      @Get()
      findAll() {
        return this.becaRequisitoService.findAll();
      }

      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.becaRequisitoService.findOne(Number(id));
      }
    } 