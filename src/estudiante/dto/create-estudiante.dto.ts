// src/estudiante/dto/create-estudiante.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsDateString, IsEmail, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstudianteDto {
  @IsNotEmpty({ message: 'El nombre del estudiante no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres.' })
  Nombre: string;

  @IsNotEmpty({ message: 'El apellido del estudiante no puede estar vacío.' })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El apellido no puede exceder los 100 caracteres.' })
  Apellido: string;

  @IsOptional() // Puede ser nulo
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato de fecha válido (YYYY-MM-DD).' })
  FechaNacimiento?: string; // Usamos string para la entrada, luego convertimos a Date en el servicio

  @IsOptional() // Puede ser nulo
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La dirección no puede exceder los 255 caracteres.' })
  Direccion?: string;

  @IsOptional() // Puede ser nulo
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El teléfono no puede exceder los 20 caracteres.' })
  Telefono?: string;

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
  @IsEmail({}, { message: 'El correo electrónico debe ser una dirección de correo válida.' })
  @MaxLength(100, { message: 'El correo electrónico no puede exceder los 100 caracteres.' })
  CorreoElectronico: string;

  @IsNotEmpty({ message: 'El ID del estado no puede estar vacío.' })
  @IsInt({ message: 'El ID del estado debe ser un número entero.' })
  @Type(() => Number)
  EstadoId: number;

  @IsNotEmpty({ message: 'El ID de la carrera no puede estar vacío.' })
  @IsInt({ message: 'El ID de la carrera debe ser un número entero.' })
  @Type(() => Number)
  CarreraId: number;
}
