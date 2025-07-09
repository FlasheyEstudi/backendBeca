// src/tipobeca/dto/update-tipobeca.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoBecaDto } from './create-tipobeca.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

// PartialType makes all properties of CreateTipoBecaDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateTipoBecaDto extends PartialType(CreateTipoBecaDto) {
  // No additional properties are needed here for now, as there is only a 'Nombre' field.
  // However, we can re-add validations if specific behavior is desired for updates.
  @IsOptional()
  @IsString({ message: 'The type of scholarship name must be a string.' })
  @MaxLength(100, { message: 'The type of scholarship name cannot exceed 100 characters.' })
  Nombre?: string;
}
