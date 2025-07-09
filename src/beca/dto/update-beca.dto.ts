// src/beca/dto/update-beca.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBecaDto } from './create-beca.dto';
import { IsOptional, IsString, MaxLength, IsNumber, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateBecaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateBecaDto extends PartialType(CreateBecaDto) {
  @IsOptional()
  @IsString({ message: 'El nombre de la beca debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El nombre de la beca no puede exceder los 255 caracteres.' })
  Nombre?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El monto de la beca debe ser un número.' })
  @Min(0, { message: 'El monto de la beca no puede ser negativo.' })
  @Type(() => Number)
  Monto?: number;

  @IsOptional()
  @IsString({ message: 'La descripción de la beca debe ser una cadena de texto.' })
  Descripcion?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del tipo de beca debe ser un número entero.' })
  @Type(() => Number)
  TipoBecaId?: number;
}
