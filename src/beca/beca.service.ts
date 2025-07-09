// src/beca/beca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beca } from './entities/beca.entity';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto'; // Importa el DTO de actualización
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Importa TipoBeca para validación
import { getConnection } from 'typeorm'; // Necesario si sigues usando SPs

@Injectable()
export class BecaService {
  constructor(
    @InjectRepository(Beca)
    private readonly becaRepository: Repository<Beca>,
    @InjectRepository(TipoBeca) // Inyecta el repositorio de TipoBeca para validación
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  // Método para crear una Beca
  async create(createBecaDto: CreateBecaDto): Promise<Beca> {
    // 1. Verificar si el TipoBecaId existe
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: createBecaDto.TipoBecaId } });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${createBecaDto.TipoBecaId} no encontrado.`);
    }

    // 2. Verificar si ya existe una beca con el mismo nombre (asumiendo que Nombre es único)
    const existingBeca = await this.becaRepository.findOne({ where: { Nombre: createBecaDto.Nombre } });
    if (existingBeca) {
      throw new ConflictException(`La beca con nombre '${createBecaDto.Nombre}' ya existe.`);
    }

    // 3. Crear y guardar la nueva beca
    const nuevaBeca = this.becaRepository.create(createBecaDto);
    return await this.becaRepository.save(nuevaBeca);
  }

  // Método para obtener todas las Becas
  async findAll(): Promise<Beca[]> {
    return await this.becaRepository.find({ relations: ['tipoBeca'] }); // Incluye la relación con TipoBeca
  }

  // --- NUEVO: Método para obtener una Beca por ID ---
  async findOne(id: number): Promise<Beca> {
    const beca = await this.becaRepository.findOne({ where: { Id: id }, relations: ['tipoBeca'] });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${id} no encontrada.`);
    }
    return beca;
  }

  // --- NUEVO: Método para actualizar una Beca ---
  async update(id: number, updateBecaDto: UpdateBecaDto): Promise<Beca> {
    const beca = await this.becaRepository.findOne({ where: { Id: id } });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${id} no encontrada.`);
    }

    // Si se intenta actualizar TipoBecaId, verificar que el nuevo ID exista
    if (updateBecaDto.TipoBecaId && updateBecaDto.TipoBecaId !== beca.TipoBecaId) {
      const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: updateBecaDto.TipoBecaId } });
      if (!tipoBeca) {
        throw new NotFoundException(`Tipo de Beca con ID ${updateBecaDto.TipoBecaId} no encontrado.`);
      }
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya en otra beca
    if (updateBecaDto.Nombre && updateBecaDto.Nombre !== beca.Nombre) {
      const existingBeca = await this.becaRepository.findOne({ where: { Nombre: updateBecaDto.Nombre } });
      if (existingBeca && existingBeca.Id !== id) {
        throw new ConflictException(`La beca con nombre '${updateBecaDto.Nombre}' ya existe.`);
      }
    }

    // Aplica los cambios del DTO al objeto de la beca existente
    this.becaRepository.merge(beca, updateBecaDto);
    return await this.becaRepository.save(beca);
  }

  // --- NUEVO: Método para eliminar una Beca ---
  async remove(id: number): Promise<void> {
    const result = await this.becaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Beca con ID ${id} no encontrada.`);
    }
  }

  // --- Métodos existentes para procedimientos almacenados (si aún los necesitas) ---
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
