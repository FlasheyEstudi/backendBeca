import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAsignaturaDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsInt()
  @IsNotEmpty()
  Creditos: number;
}