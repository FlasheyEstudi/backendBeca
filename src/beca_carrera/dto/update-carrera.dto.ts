// src/beca_carrera/dto/update-carrera.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from '../../carrera/dto/create-carrera.dto';

// PartialType hace que todas las propiedades de CreateCarreraDto (incluyendo Horario) sean opcionales
export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {
  // No necesitas añadir Horario aquí explícitamente, ya lo hereda como opcional.
}
