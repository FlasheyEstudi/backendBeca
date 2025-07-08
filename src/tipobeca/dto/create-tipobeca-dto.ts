// src/tipobeca/dto/create-tipobeca.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTipoBecaDto {
  @IsNotEmpty({ message: 'El nombre del tipo de beca no puede estar vacío.' })
  @IsString({ message: 'El nombre del tipo de beca debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre del tipo de beca no puede exceder los 100 caracteres.' })
  Nombre: string;
}
