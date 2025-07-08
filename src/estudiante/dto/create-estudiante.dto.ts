import { IsNotEmpty, IsString, IsInt, IsEmail, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Horario { // Añade 'export' antes de 'enum'
  Diurno = 'Diurno',
  Sabatino = 'Sabatino',
  Dominical = 'Dominical',
}

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  Nombre: string;

  @IsNotEmpty()
  @IsString()
  Apellido: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  Edad: number;

  @IsNotEmpty()
  @IsEmail()
  Correo: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  EstadoId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  CarreraId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  Anio: number;

  @IsNotEmpty()
  @IsEnum(Horario)
  Horario: Horario;
}