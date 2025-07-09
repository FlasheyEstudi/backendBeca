// src/requisito/requisito.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Added Patch, Delete, HttpCode, HttpStatus
import { BecaRequisitoService } from './requisito.service';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito.dto'; // Import the update DTO

@Controller('beca-requisito')
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

  // --- NEW: Route to update a Requisito (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRequisitoDto: UpdateRequisitoDto) {
    return this.becaRequisitoService.update(Number(id), updateRequisitoDto);
  }

  // --- NEW: Route to delete a Requisito (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Returns 204 No Content on success
  async remove(@Param('id') id: string) {
    await this.becaRequisitoService.remove(Number(id));
  }
}
