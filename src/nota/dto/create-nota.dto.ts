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
  Nota: number; // Cambiado de 'Valor' a 'Nota'
}