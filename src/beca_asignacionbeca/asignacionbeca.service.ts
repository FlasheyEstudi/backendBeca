// src/beca_asignacionbeca/asignacionbeca.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BecaAsignacionBeca } from './entities/asignacionbeca.entity';
import { CreateAsignacionBecaDto } from './dto/create-asignacionbeca.dto';
import { UpdateAsignacionBecaDto } from './dto/update-asignacionbeca.dto';
import { plainToClass } from 'class-transformer';
import { SolicitudBeca } from '../beca_solicitudbeca/entities/solicitudbeca.entity'; // Importa la entidad SolicitudBeca

@Injectable()
export class BecaAsignacionBecaService {
  private readonly validEstados = ['Pendiente', 'Asignada', 'Activa', 'Realizada', 'Finalizada', 'Pausada', 'Cancelada'];

  constructor(
    @InjectRepository(BecaAsignacionBeca)
    private readonly becaAsignacionRepository: Repository<BecaAsignacionBeca>,
    @InjectRepository(SolicitudBeca) // Inyecta el repositorio de SolicitudBeca
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
  ) {}

  async create(createBecaAsignacionDto: CreateAsignacionBecaDto): Promise<BecaAsignacionBeca> {
    // Validar estado si se proporciona
    if (createBecaAsignacionDto.EstadoAsignacion && !this.validEstados.includes(createBecaAsignacionDto.EstadoAsignacion)) {
      throw new BadRequestException(`Estado '${createBecaAsignacionDto.EstadoAsignacion}' no es válido. Usa: ${this.validEstados.join(', ')}`);
    }

    // Convertir FechaAsignacion de string a Date si se proporciona
    const entityData = plainToClass(BecaAsignacionBeca, createBecaAsignacionDto);
    if (createBecaAsignacionDto.FechaAsignacion) {
      entityData.FechaAsignacion = new Date(createBecaAsignacionDto.FechaAsignacion);
    }

    const nuevaAsignacion = this.becaAsignacionRepository.create(entityData);
    const asignacionGuardada = await this.becaAsignacionRepository.save(nuevaAsignacion);

    // Lógica para actualizar el estado de la SolicitudBeca
    // Usar SolicitudBecaId directamente, ya que la relación no se carga automáticamente en el objeto guardado
    if (asignacionGuardada.EstadoAsignacion === 'Asignada' && asignacionGuardada.SolicitudBecaId) {
      const solicitud = await this.solicitudBecaRepository.findOne({
        where: { Id: asignacionGuardada.SolicitudBecaId }, // ¡CORREGIDO AQUÍ! Usar SolicitudBecaId
      });

      if (solicitud && solicitud.EstadoSolicitud === 'Pendiente') {
        solicitud.EstadoSolicitud = 'Aprobada';
        await this.solicitudBecaRepository.save(solicitud);
      }
    }

    return asignacionGuardada;
  }

  async findAll(): Promise<BecaAsignacionBeca[]> {
    return await this.becaAsignacionRepository.find({ relations: ['solicitudBeca'] });
  }

  async findOne(id: number): Promise<BecaAsignacionBeca> {
    const asignacion = await this.becaAsignacionRepository.findOne({ where: { Id: id }, relations: ['solicitudBeca'] });
    if (!asignacion) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }
    return asignacion;
  }

  async update(id: number, updateBecaAsignacionDto: UpdateAsignacionBecaDto): Promise<BecaAsignacionBeca> {
    const asignacion = await this.becaAsignacionRepository.findOne({ where: { Id: id } });
    if (!asignacion) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    // Guarda el estado anterior de la asignación para comparar después
    const estadoAsignacionAnterior = asignacion.EstadoAsignacion;

    if (updateBecaAsignacionDto.EstadoAsignacion && !this.validEstados.includes(updateBecaAsignacionDto.EstadoAsignacion)) {
      throw new BadRequestException(`Estado '${updateBecaAsignacionDto.EstadoAsignacion}' no es válido. Usa: ${this.validEstados.join(', ')}`);
    }

    // Convertir FechaFinalizacion de string a Date si se proporciona
    const entityData = plainToClass(BecaAsignacionBeca, updateBecaAsignacionDto);
    if (updateBecaAsignacionDto.FechaFinalizacion) {
      entityData.FechaFinalizacion = new Date(updateBecaAsignacionDto.FechaFinalizacion);
    }

    this.becaAsignacionRepository.merge(asignacion, entityData);
    const asignacionActualizada = await this.becaAsignacionRepository.save(asignacion);

    // Lógica para actualizar el estado de la SolicitudBeca si el estado de asignación cambia a 'Asignada'
    // Usar SolicitudBecaId directamente
    if (
      asignacionActualizada.EstadoAsignacion === 'Asignada' &&
      estadoAsignacionAnterior !== 'Asignada' && // Solo si el estado ha cambiado a 'Asignada'
      asignacionActualizada.SolicitudBecaId // ¡CORREGIDO AQUÍ! Usar SolicitudBecaId
    ) {
      const solicitud = await this.solicitudBecaRepository.findOne({
        where: { Id: asignacionActualizada.SolicitudBecaId }, // ¡CORREGIDO AQUÍ! Usar SolicitudBecaId
      });

      if (solicitud && solicitud.EstadoSolicitud === 'Pendiente') {
        solicitud.EstadoSolicitud = 'Aprobada';
        await this.solicitudBecaRepository.save(solicitud);
      }
    }

    return asignacionActualizada;
  }

  async remove(id: number): Promise<void> {
    const result = await this.becaAsignacionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }
  }
}
