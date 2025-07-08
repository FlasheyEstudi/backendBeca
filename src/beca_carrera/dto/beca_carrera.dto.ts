import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty({ message: 'El nombre de la carrera no puede estar vacío.' })
  @IsString({ message: 'El nombre de la carrera debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre de la carrera no puede exceder los 100 caracteres.' })
  Nombre: string;
}
