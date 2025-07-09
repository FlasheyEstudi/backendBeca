// src/beca_carrera/dto/update-carrera.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from './create-carrera.dto';

export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {
  // No necesitas añadir Horario aquí explícitamente, ya lo hereda como opcional.
}
