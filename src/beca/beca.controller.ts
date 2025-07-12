import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BecaService } from './beca.service';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto';

@Controller('beca')
export class BecaController {
  constructor(private readonly becaService: BecaService) {}

  // ✔ Crear una nueva beca
  @Post()
  async create(@Body() createBecaDto: CreateBecaDto) {
    return this.becaService.create(createBecaDto);
  }

  // ✔ Obtener todas las becas
  @Get()
  findAll() {
    return this.becaService.findAll();
  }

  // ✔ Obtener una beca por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.becaService.findOne(Number(id));
  }

  // ✔ Actualizar una beca
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBecaDto: UpdateBecaDto,
  ) {
    return this.becaService.update(Number(id), updateBecaDto);
  }

  // ✔ Eliminar una beca
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.becaService.remove(Number(id));
  }

  // ✔ Verificar requisitos para asignar beca (usa SP)
  @Post('verificar')
  async verificarRequisitos(
    @Body()
    body: {
      estudianteId: number;
      tipoBecaId: number;
      periodoId: number;
    },
  ) {
    const { cumple, mensaje } = await this.becaService.verificarRequisitos(
      body.estudianteId,
      body.tipoBecaId,
      body.periodoId,
    );
    return { cumple, mensaje };
  }

  // ✔ Asignar beca (usa SP)
  @Post('asignar')
  async asignarBeca(
    @Body()
    body: {
      estudianteId: number;
      tipoBecaId: number;
      periodoId: number;
      monto: number;
      asignadoPor: number;
    },
  ) {
    const { resultado, mensaje } = await this.becaService.asignarBeca(
      body.estudianteId,
      body.tipoBecaId,
      body.periodoId,
      body.monto,
      body.asignadoPor,
    );
    return { resultado, mensaje };
  }
}
