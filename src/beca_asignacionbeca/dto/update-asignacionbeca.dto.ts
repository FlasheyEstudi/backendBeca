import { IsOptional, IsString, MaxLength, IsDateString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAsignacionBecaDto {
  @IsOptional()
  @IsString({ message: 'El estado de asignación debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El estado de asignación no puede exceder los 50 caracteres.' })
  EstadoAsignacion?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de finalización debe ser una cadena de fecha válida (YYYY-MM-DD).' })
  FechaFinalizacion?: string;
}