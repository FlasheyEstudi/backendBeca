import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoBecaDto } from './create-tipobeca.dto';
import { IsOptional, IsString, MaxLength, IsNumber, Min } from 'class-validator';

// PartialType makes all properties of CreateTipoBecaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateTipoBecaDto extends PartialType(CreateTipoBecaDto) {
  @IsOptional()
  @IsString({ message: 'El nombre del tipo de beca debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre del tipo de beca no puede exceder los 100 caracteres.' })
  Nombre?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La descripción no puede exceder los 255 caracteres.' })
  Descripcion?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El monto debe ser un número.' })
  @Min(0, { message: 'El monto no puede ser negativo.' })
  Monto?: number;
}