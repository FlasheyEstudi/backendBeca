import { Controller, Post, Body } from '@nestjs/common';
import { BecaService } from './beca.service';

@Controller('beca')
export class BecaController {
  constructor(private readonly becaService: BecaService) {}

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