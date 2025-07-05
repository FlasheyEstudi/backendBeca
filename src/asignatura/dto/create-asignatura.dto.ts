import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateAsignaturaDto {
  @IsNumber()
  @IsNotEmpty()
  Id: number;

  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsNumber()
  @IsNotEmpty()
  Creditos: number;
}