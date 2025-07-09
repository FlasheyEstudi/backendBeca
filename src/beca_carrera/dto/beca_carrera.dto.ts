// src/beca_carrera/dto/create-carrera.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty({ message: 'El nombre de la carrera no puede estar vacío.' })
  @IsString({ message: 'El nombre de la carrera debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre de la carrera no puede exceder los 100 caracteres.' })
  Nombre: string;

  // --- NUEVA PROPIEDAD AÑADIDA: Horario ---
  @IsNotEmpty({ message: 'El horario de la carrera no puede estar vacío.' })
  @IsEnum(['Diurno', 'Sabatino', 'Dominical'], { message: 'El horario debe ser Diurno, Sabatino o Dominical.' })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';
  // --- FIN NUEVA PROPIEDAD ---
}
