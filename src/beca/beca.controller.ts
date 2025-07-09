// src/beca/beca.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common'; // Añadidos Param, Patch, Delete, HttpCode, HttpStatus
import { BecaService } from './beca.service';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto'; // Importa el DTO de actualización

@Controller('beca')
export class BecaController {
  constructor(private readonly becaService: BecaService) {}

  // Ruta para crear una Beca
  @Post()
  async create(@Body() createBecaDto: CreateBecaDto) {
    return this.becaService.create(createBecaDto);
  }

  // Ruta para obtener todas las Becas
  @Get()
  findAll() {
    return this.becaService.findAll();
  }

  // --- NUEVO: Ruta para obtener una Beca por ID ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaService.findOne(Number(id));
  }

  // --- NUEVO: Ruta para actualizar una Beca (PATCH) ---
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBecaDto: UpdateBecaDto) {
    return this.becaService.update(Number(id), updateBecaDto);
  }

  // --- NUEVO: Ruta para eliminar una Beca (DELETE) ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async remove(@Param('id') id: string) {
    await this.becaService.remove(Number(id));
  }

  // --- Rutas existentes para procedimientos almacenados (si aún los necesitas) ---
  @Post('verificar')
  async verificarRequisitos(@Body() body: { estudianteId: number; tipoBecaId: number; periodoId: number }) {
    const { cumple, mensaje } = await this.becaService.verificarRequisitos(
      body.estudianteId,
      body.tipoBecaId,
      body.periodoId
    );
    return { cumple, mensaje };
  }

  @Post('asignar')
  async asignarBeca(
    @Body()
    body: { estudianteId: number; tipoBecaId: number; periodoId: number; monto: number; asignadoPor: number }
  ) {
    const { resultado, mensaje } = await this.becaService.asignarBeca(
      body.estudianteId,
      body.tipoBecaId,
      body.periodoId,
      body.monto,
      body.asignadoPor
    );
    return { resultado, mensaje };
  }
}
