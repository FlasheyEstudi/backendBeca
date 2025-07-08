// src/asignatura/dto/create-asignatura.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer'; // Asegúrate de importar Type si lo usas

export class CreateAsignaturaDto {
  @IsNotEmpty()
  @IsString()
  Nombre: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // Esto es importante si el valor viene como string del JSON
  Creditos: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // Esto es importante si el valor viene como string del JSON
  CarreraId: number; // <--- ¡Asegúrate de que esta línea esté aquí!
}