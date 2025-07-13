// src/beca_asignacionbeca/dto/create-asignacionbeca.dto.ts
import { IsNotEmpty, IsInt, IsDateString, IsOptional, IsString, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type

export class CreateAsignacionBecaDto {
  @IsOptional() // La fecha de asignación puede ser opcional, el default de la DB la llenará
  @IsDateString({}, { message: 'La fecha de asignación debe ser una cadena de fecha válida (YYYY-MM-DD).' })
  FechaAsignacion?: string; // Usamos string para la entrada, luego convertimos a Date en el servicio

  @IsNotEmpty({ message: 'El monto asignado no puede estar vacío.' })
  @IsNumber({}, { message: 'El monto asignado debe ser un número.' })
  @Min(0, { message: 'El monto asignado no puede ser negativo.' })
  @Type(() => Number)
  MontoAsignado: number;

  @IsOptional() // El estado de asignación puede ser opcional, el default de la DB lo llenará
  @IsString({ message: 'El estado de asignación debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El estado de asignación no puede exceder los 50 caracteres.' })
  EstadoAsignacion?: string; // Ej. 'Asignada', 'Cancelada'

  @IsNotEmpty({ message: 'El ID de la solicitud de beca no puede estar vacío.' })
  @IsInt({ message: 'El ID de la solicitud de beca debe ser un número entero.' })
  @Type(() => Number)
  SolicitudBecaId: number;

  
}
