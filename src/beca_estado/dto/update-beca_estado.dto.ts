// src/beca_estado/dto/update-beca-estado.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBecaEstadoDto } from './create-beca_estado.dto';

// PartialType hace que todas las propiedades de CreateBecaEstadoDto sean opcionales.
// Esto es ideal para operaciones PATCH, donde solo se envían los campos a actualizar.
export class UpdateBecaEstadoDto extends PartialType(CreateBecaEstadoDto) {
  // No necesitamos añadir nada más aquí por ahora, ya que solo hay un campo 'Nombre'
}
