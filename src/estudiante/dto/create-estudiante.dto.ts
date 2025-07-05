import { IsString, IsInt, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  Apellido: string;

  @IsInt()
  @IsNotEmpty()
  Edad: number;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsInt()
  @IsNotEmpty()
  EstadoId: number;

  @IsInt()
  @IsNotEmpty()
  CarreraId: number;

  @IsInt()
  @IsNotEmpty()
  Anio: number;

  @IsEnum(['Diurno', 'Sabatino', 'Dominical'])
  @IsNotEmpty()
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';
}