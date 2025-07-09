// src/periodoacademico/dto/update-periodoacademico.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoAcademicoDto } from './create-periodoacademico.dto';
import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

// PartialType makes all properties of CreatePeriodoAcademicoDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdatePeriodoAcademicoDto extends PartialType(CreatePeriodoAcademicoDto) {
  @IsOptional()
  @IsString({ message: 'The academic period name must be a string.' })
  @MaxLength(100, { message: 'The academic period name cannot exceed 100 characters.' })
  Nombre?: string;

  @IsOptional()
  @IsDateString({}, { message: 'The start date must be a valid date string (YYYY-MM-DD).' })
  FechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'The end date must be a valid date string (YYYY-MM-DD).' })
  FechaFin?: string;
}
