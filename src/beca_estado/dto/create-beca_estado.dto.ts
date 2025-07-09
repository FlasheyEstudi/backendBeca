// src/beca_estado/dto/create-beca_estado.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBecaEstadoDto {
  @IsNotEmpty({ message: 'El nombre del estado no puede estar vacío.' })
  @IsString({ message: 'El nombre del estado debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre del estado no puede exceder los 100 caracteres.' })
  Nombre: string;
}
