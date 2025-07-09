// src/beca/beca.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common'; // Añadido Get
import { BecaService } from './beca.service';
import { CreateBecaDto } from './dto/create-beca.dto'; // Importa el DTO de creación

@Controller('beca')
export class BecaController {
  constructor(private readonly becaService: BecaService) {}

  // --- NUEVO: Ruta para crear una Beca ---
  @Post() // Esta es la ruta para POST /beca
  async create(@Body() createBecaDto: CreateBecaDto) {
    return this.becaService.create(createBecaDto);
  }

  // --- NUEVO: Ruta para obtener todas las Becas ---
  @Get() // Esta es la ruta para GET /beca
  findAll() {
    return this.becaService.findAll();
  }

  // --- Rutas existentes para procedimientos almacenados ---
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
