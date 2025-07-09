// src/requisito/dto/update-requisito.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisitoDto } from './create-requisito.dto';
import { IsOptional, IsString, MaxLength, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateRequisitoDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateRequisitoDto extends PartialType(CreateRequisitoDto) {
  @IsOptional()
  @IsString({ message: 'The requirement name must be a string.' })
  @MaxLength(255, { message: 'The requirement name cannot exceed 255 characters.' })
  Nombre?: string;

  @IsOptional()
  @IsString({ message: 'The requirement description must be a string.' })
  Descripcion?: string;

  @IsOptional()
  @IsInt({ message: 'The scholarship type ID must be an integer.' })
  @Type(() => Number)
  TipoBecaId?: number;
}
