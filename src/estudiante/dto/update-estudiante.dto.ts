// src/estudiante/dto/update-estudiante.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsOptional, IsString, MaxLength, IsDateString, IsEmail, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType makes all properties of CreateEstudianteDto optional.
// This is ideal for PATCH operations, where only the fields to be updated are sent.
export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres.' })
  Nombre?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El apellido no puede exceder los 100 caracteres.' })
  Apellido?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato de fecha válido (YYYY-MM-DD).' })
  FechaNacimiento?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La dirección no puede exceder los 255 caracteres.' })
  Direccion?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El teléfono no puede exceder los 20 caracteres.' })
  Telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico debe ser una dirección de correo válida.' })
  @MaxLength(100, { message: 'El correo electrónico no puede exceder los 100 caracteres.' })
  CorreoElectronico?: string; // Permitir actualización, pero la validación de unicidad estará en el servicio.

  @IsOptional()
  @IsInt({ message: 'El ID del estado debe ser un número entero.' })
  @Type(() => Number)
  EstadoId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID de la carrera debe ser un número entero.' })
  @Type(() => Number)
  CarreraId?: number;
}
