import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAsignacionBecaDto {
  @IsNotEmpty()
  solicitudId: number;

  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  estadoId: number;

  @IsNotEmpty()
  periodoId: number;

  @IsOptional()
  observaciones?: string;

  @IsOptional()
  asignadoPorEstudianteId?: number;
}