// src/asignatura/dto/update-asignatura.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignaturaDto } from './create-asignatura.dto';
import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// PartialType hace que todas las propiedades de CreateAsignaturaDto sean opcionales.
// Esto es ideal para operaciones PATCH, donde solo se envían los campos a actualizar.
export class UpdateAsignaturaDto extends PartialType(CreateAsignaturaDto) {
  // Puedes añadir validaciones adicionales o propiedades específicas para la actualización aquí si es necesario.
  // Por ejemplo, si los créditos fueran opcionales en la actualización:
  @IsOptional()
  @IsInt({ message: 'Los créditos deben ser un número entero.' })
  @Min(0, { message: 'Los créditos no pueden ser negativos.' })
  @Type(() => Number)
  Creditos?: number;

  @IsOptional()
  @IsString({ message: 'El nombre de la asignatura debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre de la asignatura no puede exceder los 100 caracteres.' })
  Nombre?: string;

  @IsOptional()
  @IsInt({ message: 'El ID de la carrera debe ser un número entero.' })
  @Type(() => Number)
  CarreraId?: number;
}
