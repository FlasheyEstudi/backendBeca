// src/beca/dto/create-beca.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type

export class CreateBecaDto {
  @IsNotEmpty({ message: 'El nombre de la beca no puede estar vacío.' })
  @IsString({ message: 'El nombre de la beca debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El nombre de la beca no puede exceder los 255 caracteres.' })
  Nombre: string;

  @IsNotEmpty({ message: 'El monto de la beca no puede estar vacío.' })
  @IsNumber({}, { message: 'El monto de la beca debe ser un número.' })
  @Min(0, { message: 'El monto de la beca no puede ser negativo.' })
  @Type(() => Number) // Asegura que el valor se transforme a número
  Monto: number;

  @IsOptional() // La descripción es opcional
  @IsString({ message: 'La descripción de la beca debe ser una cadena de texto.' })
  Descripcion?: string; // Puede ser nulo, por eso es opcional

  @IsNotEmpty({ message: 'El ID del tipo de beca no puede estar vacío.' })
  @IsInt({ message: 'El ID del tipo de beca debe ser un número entero.' })
  @Type(() => Number) // Asegura que el valor se transforme a número
  TipoBecaId: number;
}
