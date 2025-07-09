// src/beca_asignacionbeca/dto/update-asignacionbeca.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionBecaDto } from './create-asignacionbeca.dto';

// PartialType hace que todas las propiedades de CreateAsignacionBecaDto sean opcionales.
// Esto es ideal para operaciones PATCH, donde solo se envían los campos a actualizar.
export class UpdateAsignacionBecaDto extends PartialType(CreateAsignacionBecaDto) {
  // Puedes añadir validaciones adicionales o propiedades específicas para la actualización aquí si es necesario.
}
