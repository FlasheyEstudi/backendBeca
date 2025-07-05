import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsEnum(['Diurno', 'Sabatino', 'Dominical'], { message: 'Horario debe ser Diurno, Sabatino o Dominical' })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';
}