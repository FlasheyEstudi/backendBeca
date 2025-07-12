import { IsNotEmpty, IsString, MaxLength, IsNumber, Min } from 'class-validator';

export class CreateTipoBecaDto {
  @IsNotEmpty({ message: 'El nombre del tipo de beca no puede estar vacío.' })
  @IsString({ message: 'El nombre del tipo de beca debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre del tipo de beca no puede exceder los 100 caracteres.' })
  Nombre: string;

  @IsNotEmpty({ message: 'La descripción del tipo de beca no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La descripción no puede exceder los 255 caracteres.' })
  Descripcion: string;

  @IsNotEmpty({ message: 'El monto del tipo de beca no puede estar vacío.' })
  @IsNumber({}, { message: 'El monto debe ser un número.' })
  @Min(0, { message: 'El monto no puede ser negativo.' })
  Monto: number;
}