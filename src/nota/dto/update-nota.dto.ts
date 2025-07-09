// src/nota/dto/update-nota.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaDto } from './create-nota.dto';
import { IsOptional, IsNumber, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateNotaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateNotaDto extends PartialType(CreateNotaDto) {
  @IsOptional()
  @IsNumber({}, { message: 'La calificación debe ser un número.' })
  @Min(0, { message: 'La calificación no puede ser negativa.' })
  @Type(() => Number)
  Calificacion?: number;

  @IsOptional()
  @IsInt({ message: 'El ID del estudiante debe ser un número entero.' })
  @Type(() => Number)
  EstudianteId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID de la asignatura debe ser un número entero.' })
  @Type(() => Number)
  AsignaturaId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID del período académico debe ser un número entero.' })
  @Type(() => Number)
  PeriodoAcademicoId?: number;
}
