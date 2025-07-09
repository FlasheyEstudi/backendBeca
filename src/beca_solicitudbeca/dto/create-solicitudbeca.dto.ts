// src/beca_solicitudbeca/dto/create-solicitudbeca.dto.ts
import { IsNotEmpty, IsInt, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type

export class CreateSolicitudBecaDto {
  @IsOptional() // La fecha de solicitud puede ser opcional, el default de la DB la llenará
  @IsDateString({}, { message: 'La fecha de solicitud debe ser una cadena de fecha válida (YYYY-MM-DD).' })
  FechaSolicitud?: string; // Usamos string para la entrada, luego convertimos a Date en el servicio

  @IsOptional() // El estado de solicitud puede ser opcional, el default de la DB lo llenará
  @IsString({ message: 'El estado de solicitud debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El estado de solicitud no puede exceder los 50 caracteres.' })
  EstadoSolicitud?: string; // Ej. 'Pendiente', 'Aprobada', 'Rechazada'

  @IsNotEmpty({ message: 'El ID del estudiante no puede estar vacío.' })
  @IsInt({ message: 'El ID del estudiante debe ser un número entero.' })
  @Type(() => Number)
  EstudianteId: number;

  @IsNotEmpty({ message: 'El ID de la beca no puede estar vacío.' })
  @IsInt({ message: 'El ID de la beca debe ser un número entero.' })
  @Type(() => Number)
  BecaId: number;
}
