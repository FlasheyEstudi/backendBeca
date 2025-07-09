// src/nota/dto/create-nota.dto.ts
import { IsNotEmpty, IsNumber, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type

export class CreateNotaDto {
  @IsNotEmpty({ message: 'La calificación no puede estar vacía.' })
  @IsNumber({}, { message: 'La calificación debe ser un número.' })
  @Min(0, { message: 'La calificación no puede ser negativa.' })
  @Type(() => Number) // Asegura que el valor se transforme a número
  Calificacion: number;

  @IsNotEmpty({ message: 'El ID del estudiante no puede estar vacío.' })
  @IsInt({ message: 'El ID del estudiante debe ser un número entero.' })
  @Type(() => Number)
  EstudianteId: number;

  @IsNotEmpty({ message: 'El ID de la asignatura no puede estar vacío.' })
  @IsInt({ message: 'El ID de la asignatura debe ser un número entero.' })
  @Type(() => Number)
  AsignaturaId: number;

  @IsNotEmpty({ message: 'El ID del período académico no puede estar vacío.' })
  @IsInt({ message: 'El ID del período académico debe ser un número entero.' })
  @Type(() => Number)
  PeriodoAcademicoId: number;
}
