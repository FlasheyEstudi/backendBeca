import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class BecaService {
  async verificarRequisitos(estudianteId: number, tipoBecaId: number, periodoId: number): Promise<{ cumple: boolean; mensaje: string }> {
    const result = await getConnection().query(
      'CALL sp_verificar_requisitos_beca(?, ?, ?, ?, ?)',
      [estudianteId, tipoBecaId, periodoId, null, null]
    );
    return { cumple: result[0][0].p_cumple, mensaje: result[0][0].p_mensaje };
  }

  async asignarBeca(
    estudianteId: number,
    tipoBecaId: number,
    periodoId: number,
    monto: number,
    asignadoPor: number
  ): Promise<{ resultado: boolean; mensaje: string }> {
    const result = await getConnection().query(
      'CALL sp_asignar_beca(?, ?, ?, ?, ?, ?, ?)',
      [estudianteId, tipoBecaId, periodoId, monto, asignadoPor, null, null]
    );
    return { resultado: result[0][0].p_resultado, mensaje: result[0][0].p_mensaje };
  }
}