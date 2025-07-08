// src/asistencia/dto/create-asistencia.dto.ts
import { IsInt, IsDateString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer'; // Asegúrate de importar Type

export class CreateAsistenciaDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  EstudianteId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  AsignaturaId: number;

  @IsDateString()
  @IsNotEmpty()
  Fecha: string;

  @IsBoolean()
  @IsNotEmpty()
  Asistio: boolean;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  PeriodoAcademicoId: number; // <-- ¡Esta línea es crucial y debe estar aquí!
}