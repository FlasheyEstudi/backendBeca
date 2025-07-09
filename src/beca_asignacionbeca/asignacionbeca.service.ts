// src/beca_asignacionbeca/asignacionbeca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionBeca } from './entities/asignacionbeca.entity';
import { CreateAsignacionBecaDto } from './dto/create-asignacionbeca.dto';
import { UpdateAsignacionBecaDto } from './dto/update-asignacionbeca.dto'; // Importa el DTO de actualización
import { SolicitudBeca } from '../beca_solicitudbeca/entities/solicitudbeca.entity'; // Importa SolicitudBeca para validación

@Injectable()
export class AsignacionBecaService {
  constructor(
    @InjectRepository(AsignacionBeca)
    private readonly asignacionBecaRepository: Repository<AsignacionBeca>,
    @InjectRepository(SolicitudBeca) // Inyecta el repositorio de SolicitudBeca
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
  ) {}

  // Método para crear una AsignacionBeca
  async create(createAsignacionBecaDto: CreateAsignacionBecaDto): Promise<AsignacionBeca> {
    // 1. Verificar si el SolicitudBecaId existe
    const solicitudBeca = await this.solicitudBecaRepository.findOne({ where: { Id: createAsignacionBecaDto.SolicitudBecaId } });
    if (!solicitudBeca) {
      throw new NotFoundException(`Solicitud de Beca con ID ${createAsignacionBecaDto.SolicitudBecaId} no encontrada.`);
    }

    // Crear y guardar la nueva asignación de beca
    const nuevaAsignacion = this.asignacionBecaRepository.create({
      ...createAsignacionBecaDto,
      FechaAsignacion: createAsignacionBecaDto.FechaAsignacion ? new Date(createAsignacionBecaDto.FechaAsignacion) : undefined,
      // EstadoAsignacion usará el default de la DB si no se proporciona
    });
    return await this.asignacionBecaRepository.save(nuevaAsignacion);
  }

  // Método para obtener todas las AsignacionesBeca
  async findAll(): Promise<AsignacionBeca[]> {
    return await this.asignacionBecaRepository.find({ relations: ['solicitudBeca'] }); // Incluye la relación con SolicitudBeca
  }

  // Método para obtener una AsignacionBeca por ID
  async findOne(id: number): Promise<AsignacionBeca> {
    const asignacion = await this.asignacionBecaRepository.findOne({ where: { Id: id }, relations: ['solicitudBeca'] });
    if (!asignacion) {
      throw new NotFoundException(`Asignación de Beca con ID ${id} no encontrada.`);
    }
    return asignacion;
  }

  // --- NUEVO: Método para actualizar una AsignacionBeca ---
  async update(id: number, updateAsignacionBecaDto: UpdateAsignacionBecaDto): Promise<AsignacionBeca> {
    const asignacion = await this.asignacionBecaRepository.findOne({ where: { Id: id } });
    if (!asignacion) {
      throw new NotFoundException(`Asignación de Beca con ID ${id} no encontrada.`);
    }

    // Si se intenta actualizar SolicitudBecaId, verificar que el nuevo ID exista
    if (updateAsignacionBecaDto.SolicitudBecaId && updateAsignacionBecaDto.SolicitudBecaId !== asignacion.SolicitudBecaId) {
      const solicitudBeca = await this.solicitudBecaRepository.findOne({ where: { Id: updateAsignacionBecaDto.SolicitudBecaId } });
      if (!solicitudBeca) {
        throw new NotFoundException(`Solicitud de Beca con ID ${updateAsignacionBecaDto.SolicitudBecaId} no encontrada.`);
      }
    }

    // Si se actualiza la fecha, convertirla a Date y asignarla directamente a la entidad
    if (updateAsignacionBecaDto.FechaAsignacion) {
      asignacion.FechaAsignacion = new Date(updateAsignacionBecaDto.FechaAsignacion);
      // Elimina FechaAsignacion del DTO para que merge no intente asignar string a Date
      delete updateAsignacionBecaDto.FechaAsignacion;
    }

    // Aplica los cambios restantes del DTO al objeto de la asignación existente
    this.asignacionBecaRepository.merge(asignacion, updateAsignacionBecaDto);
    return await this.asignacionBecaRepository.save(asignacion);
  }

  // --- NUEVO: Método para eliminar una AsignacionBeca ---
  async remove(id: number): Promise<void> {
    const result = await this.asignacionBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignación de Beca con ID ${id} no encontrada.`);
    }
  }
}
