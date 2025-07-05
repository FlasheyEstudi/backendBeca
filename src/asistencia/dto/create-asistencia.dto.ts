import { IsNumber, IsNotEmpty, IsDate, IsBoolean, IsObject } from 'class-validator';
import { Type } from 'class-transformer'; // Importa Type de class-transformer
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

export class CreateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  Id: number;

  @IsObject()
  @IsNotEmpty()
  Estudiante: Partial<Estudiante>;

  @IsObject()
  @IsNotEmpty()
  Asignatura: Partial<Asignatura>;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // Transforma la cadena en un objeto Date
  Fecha: Date;

  @IsBoolean()
  @IsNotEmpty()
  Asistio: boolean;
}