import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoBecaService } from './tipobeca.service';
import { CreateTipoBecaDto } from './dto/create-tipobeca.dto';
import { UpdateTipoBecaDto } from './dto/update-tipobeca.dto';

@ApiTags('tipo-beca')
@Controller('tipo-beca')
export class TipoBecaController {
  constructor(private readonly tipoBecaService: TipoBecaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de beca' })
  @ApiResponse({ status: 201, description: 'Tipo de beca creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'Conflicto: Nombre de beca ya existe.' })
  async create(@Body() createTipoBecaDto: CreateTipoBecaDto) {
    return this.tipoBecaService.create(createTipoBecaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de beca' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de beca.' })
  findAll() {
    return this.tipoBecaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de beca por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de beca encontrado.' })
  @ApiResponse({ status: 404, description: 'Tipo de beca no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tipoBecaService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de beca por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de beca actualizado.' })
  @ApiResponse({ status: 404, description: 'Tipo de beca no encontrado.' })
  @ApiResponse({ status: 409, description: 'Conflicto: Nombre de beca ya existe.' })
  async update(@Param('id') id: string, @Body() updateTipoBecaDto: UpdateTipoBecaDto) {
    return this.tipoBecaService.update(Number(id), updateTipoBecaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un tipo de beca por ID' })
  @ApiResponse({ status: 204, description: 'Tipo de beca eliminado.' })
  @ApiResponse({ status: 404, description: 'Tipo de beca no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.tipoBecaService.remove(Number(id));
  }
}