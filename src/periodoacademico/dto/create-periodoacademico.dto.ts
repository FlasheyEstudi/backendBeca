// src/periodoacademico/dto/create-periodoacademico.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreatePeriodoAcademicoDto {
  @IsNotEmpty({ message: 'El nombre del período académico no puede estar vacío.' })
  @IsString({ message: 'El nombre del período académico debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre del período académico no puede exceder los 100 caracteres.' })
  Nombre: string;

  @IsNotEmpty({ message: 'La fecha de inicio no puede estar vacía.' })
  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato de fecha válido (YYYY-MM-DD).' })
  FechaInicio: string; // Se espera como string en formato 'YYYY-MM-DD'

  @IsNotEmpty({ message: 'La fecha de fin no puede estar vacía.' })
  @IsDateString({}, { message: 'La fecha de fin debe tener un formato de fecha válido (YYYY-MM-DD).' })
  FechaFin: string; // Se espera como string en formato 'YYYY-MM-DD'
}
