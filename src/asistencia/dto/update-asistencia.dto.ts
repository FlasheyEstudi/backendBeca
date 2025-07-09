// src/asistencia/dto/update-asistencia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaDto } from './create-asistencia.dto';
import { IsOptional, IsBoolean, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateAsistenciaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de asistencia debe tener un formato de fecha válido (YYYY-MM-DD).' })
  Fecha?: string;

  @IsOptional()
  @IsBoolean({ message: 'Asistio debe ser un valor booleano (true/false).' })
  Asistio?: boolean;

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
