import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSolicitudBecaDto {
  @IsNotEmpty()
  estudianteId: number;

  @IsNotEmpty()
  tipoBecaId: number;

  @IsNotEmpty()
  periodoId: number;

  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  estadoId: number;
}