// src/beca_requisito/dto/create-requisito.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type

export class CreateRequisitoDto {
  @IsNotEmpty({ message: 'El nombre del requisito no puede estar vacío.' })
  @IsString({ message: 'El nombre del requisito debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El nombre del requisito no puede exceder los 255 caracteres.' })
  Nombre: string;

  @IsOptional() // La descripción es opcional
  @IsString({ message: 'La descripción del requisito debe ser una cadena de texto.' })
  Descripcion: string;

  @IsNotEmpty({ message: 'El ID del tipo de beca no puede estar vacío.' })
  @IsInt({ message: 'El ID del tipo de beca debe ser un número entero.' })
  @Type(() => Number) // Transforma el valor a número si viene como string
  TipoBecaId: number; // ¡Ahora requerido en el DTO!
}
