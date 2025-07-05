import { IsNumber, IsString, IsEmail, IsNotEmpty, IsObject } from 'class-validator';
import { Beca_Estado } from '../../beca_estado/entities/beca_estado.entity';
import { Beca_Carrera } from '../../beca_carrera/entities/beca_carrera.entity';

export class CreateEstudianteDto {
  @IsNumber()
  @IsNotEmpty()
  Id: number;

  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  Apellido: string;

  @IsNumber()
  @IsNotEmpty()
  Edad: number;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsObject()
  @IsNotEmpty()
  Estado: Partial<Beca_Estado>; // Solo necesita el Id para la relación

  @IsObject()
  @IsNotEmpty()
  Carrera: Partial<Beca_Carrera>; // Solo necesita el Id para la relación
  Anio: any;
  Horario: any;
}