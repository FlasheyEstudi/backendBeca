import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Beca } from './entities/beca.entity';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto';
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity';

@Injectable()
export class BecaService {
  private readonly logger = new Logger(BecaService.name);

  constructor(
    @InjectRepository(Beca)
    private readonly becaRepository: Repository<Beca>,
    @InjectRepository(TipoBeca)
    private readonly tipoBecaRepository: Repository<TipoBeca>,
    private dataSource: DataSource,
  ) {}

  // ✔ Crear beca
  async create(createBecaDto: CreateBecaDto): Promise<Beca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({
      where: { Id: createBecaDto.TipoBecaId },
    });
    if (!tipoBeca) {
      throw new NotFoundException(
        `Tipo de Beca con ID ${createBecaDto.TipoBecaId} no encontrado.`,
      );
    }

    const existente = await this.becaRepository.findOne({
      where: { Nombre: createBecaDto.Nombre },
    });
    if (existente) {
      throw new ConflictException(
        `Ya existe una beca con el nombre '${createBecaDto.Nombre}'.`,
      );
    }

    const beca = this.becaRepository.create(createBecaDto);
    return await this.becaRepository.save(beca);
  }

  // ✔ Listar todas las becas
  async findAll(): Promise<Beca[]> {
    return await this.becaRepository.find({ relations: ['tipoBeca'] });
  }

  // ✔ Obtener una beca por ID
  async findOne(id: number): Promise<Beca> {
    const beca = await this.becaRepository.findOne({
      where: { Id: id },
      relations: ['tipoBeca'],
    });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${id} no encontrada.`);
    }
    return beca;
  }

  // ✔ Actualizar beca
  async update(id: number, updateBecaDto: UpdateBecaDto): Promise<Beca> {
    const beca = await this.becaRepository.findOne({ where: { Id: id } });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${id} no encontrada.`);
    }

    if (
      updateBecaDto.TipoBecaId &&
      updateBecaDto.TipoBecaId !== beca.TipoBecaId
    ) {
      const tipoBeca = await this.tipoBecaRepository.findOne({
        where: { Id: updateBecaDto.TipoBecaId },
      });
      if (!tipoBeca) {
        throw new NotFoundException(
          `Tipo de Beca con ID ${updateBecaDto.TipoBecaId} no encontrado.`,
        );
      }
    }

    if (updateBecaDto.Nombre && updateBecaDto.Nombre !== beca.Nombre) {
      const existente = await this.becaRepository.findOne({
        where: { Nombre: updateBecaDto.Nombre },
      });
      if (existente && existente.Id !== id) {
        throw new ConflictException(
          `Ya existe una beca con el nombre '${updateBecaDto.Nombre}'.`,
        );
      }
    }

    this.becaRepository.merge(beca, updateBecaDto);
    return await this.becaRepository.save(beca);
  }

  // ✔ Eliminar beca
  async remove(id: number): Promise<void> {
    const resultado = await this.becaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró la beca con ID ${id}.`);
    }
  }

  // ✔ Verificar requisitos
 // ✔ Verificar requisitos
async verificarRequisitos(
  estudianteId: number,
  tipoBecaId: number,
  periodoId: number,
): Promise<{ cumple: boolean; mensaje: string }> {
  this.logger.debug(
    `Llamando a sp_verificar_requisitos_beca con: estudianteId=${estudianteId}, tipoBecaId=${tipoBecaId}, periodoId=${periodoId}`,
  );
  try {
    await this.dataSource.query(
      'CALL sp_verificar_requisitos_beca(?, ?, ?, @p_cumple, @p_mensaje)',
      [estudianteId, tipoBecaId, periodoId],
    );

    const result = await this.dataSource.query(
      'SELECT @p_cumple AS cumple, @p_mensaje AS mensaje',
    );

    this.logger.debug('Resultado del procedimiento:', result);

    if (result && result.length > 0) {
      return {
        cumple: result[0].cumple === '1' || result[0].cumple === 1, // ✅ Conversión explícita
        mensaje: result[0].mensaje,
      };
    } else {
      this.logger.warn('Resultado vacío del SP.');
      return {
        cumple: false,
        mensaje: 'No se pudo procesar el procedimiento almacenado.',
      };
    }
  } catch (error) {
    this.logger.error(
      `Error en sp_verificar_requisitos_beca: ${error.message}`,
      error.stack,
    );
    throw error;
  }
}


  // ✔ Asignar beca
  async asignarBeca(
    estudianteId: number,
    tipoBecaId: number,
    periodoId: number,
    monto: number,
    asignadoPor: number,
  ): Promise<{ resultado: boolean; mensaje: string }> {
    this.logger.debug(
      `Llamando a sp_asignar_beca con: estudianteId=${estudianteId}, tipoBecaId=${tipoBecaId}, periodoId=${periodoId}, monto=${monto}, asignadoPor=${asignadoPor}`,
    );
    try {
      await this.dataSource.query(
        'CALL sp_asignar_beca(?, ?, ?, ?, ?, @p_resultado, @p_mensaje)',
        [estudianteId, tipoBecaId, periodoId, monto, asignadoPor],
      );

      const result = await this.dataSource.query(
        'SELECT @p_resultado AS resultado, @p_mensaje AS mensaje',
      );
      this.logger.debug('Resultado del procedimiento:', result);

      if (result && result.length > 0) {
        return {
          resultado: result[0].resultado === 1 || result[0].resultado === true,
          mensaje: result[0].mensaje,
        };
      } else {
        this.logger.warn('Resultado vacío del SP de asignación.');
        return {
          resultado: false,
          mensaje: 'No se pudo procesar la asignación de beca.',
        };
      }
    } catch (error) {
      this.logger.error(
        `Error en sp_asignar_beca: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
