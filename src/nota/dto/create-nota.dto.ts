import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateNotaDto {
  @IsInt()
  @IsNotEmpty()
  EstudianteId: number;

  @IsInt()
  @IsNotEmpty()
  AsignaturaId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  Nota: number;

  @IsInt() // Agregamos validación para PeriodoAcademicoId
  @IsNotEmpty() // Este campo es obligatorio
  PeriodoAcademicoId: number; // Agrega este campo
}