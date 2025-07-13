// src/beca_solicitudbeca/dto/update-solicitudbeca.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudBecaDto } from './create-solicitudbeca.dto';
import { IsOptional, IsString, MaxLength, IsDateString, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateSolicitudBecaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateSolicitudBecaDto extends PartialType(CreateSolicitudBecaDto) {
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de solicitud debe ser una cadena de fecha válida (YYYY-MM-DD).' })
  FechaSolicitud?: string;

  @IsOptional()
  @IsString({ message: 'El estado de solicitud debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El estado de solicitud no puede exceder los 50 caracteres.' })
  EstadoSolicitud?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del estudiante debe ser un número entero.' })
  @Type(() => Number)
  EstudianteId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID de la beca debe ser un número entero.' })
  @Type(() => Number)
  BecaId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID del período académico debe ser un número entero.' })
  @Type(() => Number)
  PeriodoAcademicoId?: number; // CAMBIADO: Renombrado de PeriodoId a PeriodoAcademicoId

  @IsOptional()
  @IsBoolean({ message: 'DocumentosVerificados debe ser un valor booleano.' })
  DocumentosVerificados?: boolean; // Nuevo campo
}
