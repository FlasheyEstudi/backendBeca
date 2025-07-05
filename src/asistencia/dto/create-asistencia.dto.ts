import { IsInt, IsDateString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateAsistenciaDto {
  @IsInt()
  @IsNotEmpty()
  EstudianteId: number;

  @IsInt()
  @IsNotEmpty()
  AsignaturaId: number;

  @IsDateString()
  @IsNotEmpty()
  Fecha: string;

  @IsBoolean()
  @IsNotEmpty()
  Asistio: boolean;
}