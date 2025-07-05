import { IsNumber, IsNotEmpty, Min, Max, IsObject } from 'class-validator';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

export class CreateNotaDto {
  @IsNumber()
  @IsNotEmpty()
  Id: number;

  @IsObject()
  @IsNotEmpty()
  Estudiante: Partial<Estudiante>;

  @IsObject()
  @IsNotEmpty()
  Asignatura: Partial<Asignatura>;

  @IsNumber()
  @IsNotEmpty()
  @Min(0) // Cambio de 0 a 100
  @Max(100) // Cambio de 10 a 100
  Nota: number;
}